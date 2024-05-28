import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from '../projects/model/project.schema';
import { Model } from 'mongoose';
import { ResponseEntity } from 'src/utils/responses';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class ProjectsService {  

  constructor(@InjectModel(Project.name) private readonly projectModel: ModelExt<ProjectDocument>) { }

  async createProject(createProjectDto: CreateProjectDto): Promise<ResponseEntity<Project>> {
    const newProject = await this.projectModel.create(createProjectDto);
    
    return new ResponseEntity<Project>()
      .setData(newProject)
      .setTitle('createProject')
      .setMessage('Project was successfully created')
      .setStatus(200)
      .build();
  }

  async getAllProjects(): Promise<ResponseEntity<Project[]>> {
    const projectsList = await this.projectModel.find();

    return new ResponseEntity<Project[]>()
      .setData(projectsList)
      .setTitle('getAllProjects')
      .setMessage('Projects were successfully found')
      .setStatus(200)
      .build();
  }

  async getProjectById(id: string): Promise<ResponseEntity<Project>> {
    const project = await this.projectModel.findById(id).populate('tasks');
    
    if (!project) throw new NotFoundException(`Project with ID "${id}" not found`);

    return new ResponseEntity<Project>()
      .setData(project)
      .setTitle('getProjectById')
      .setMessage('Project was successfully found')
      .setStatus(200)
      .build();
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<ResponseEntity<Project>> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto)

    if (!updatedProject) throw new NotFoundException(`Project with ID "${id}" not found`);

    return new ResponseEntity<Project>()
      .setData(updatedProject)
      .setTitle('updateProject')
      .setMessage('Project was updated')
      .setStatus(200)
      .build();
  }

  async deleteProject(id: string): Promise<ResponseEntity<Project>> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id);

    if (!deletedProject) throw new NotFoundException(`Project with ID "${id}" not found`);

    return new ResponseEntity<Project>()
      .setData(deletedProject)
      .setTitle('deleteProject')
      .setMessage('Project was successfully deleted')
      .setStatus(200)
      .build();
  }
  
}
