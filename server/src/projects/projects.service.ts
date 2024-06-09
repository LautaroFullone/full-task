import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from '../projects/model/project.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { ResponseEntity } from 'src/utils/responses';
import { UserDocument } from 'src/users/model/user.schema';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class ProjectsService {  

  constructor(@InjectModel(Project.name) private readonly projectModel: ModelExt<ProjectDocument>) { }

  async createProject(user: UserDocument, createProjectDto: CreateProjectDto): Promise<ResponseEntity<Project>> {
    
    const newProject = await this.projectModel.create({ ...createProjectDto, manager: user._id });
    
    return new ResponseEntity<Project>()
      .setRecords(newProject)
      .setTitle('createProject')
      .setMessage('Project was successfully created')
      .setStatus(200)
      .build();
  }

  async getAllProjects(user: UserDocument): Promise<ResponseEntity<Project[]>> {
    
    const projectsList = await this.projectModel.find({ manager: user._id }).populate('tasks');

    return new ResponseEntity<Project[]>()
      .setRecords(projectsList)
      .setTitle('getAllProjects')
      .setMessage('Projects were successfully found')
      .setStatus(200)
      .build();
  }

  async getProjectById(user: UserDocument, id: ProjectDocument['_id']): Promise<ResponseEntity<Project>> {
    
    const project = await this.projectModel.findById(id)
      .populate('tasks');
    
    if(!project) throw new NotFoundException(`Project with ID "${id}" not found`);

    if(project.manager.toString() !== user._id.toString()) throw new ForbiddenException(`Invalid action`);

    return new ResponseEntity<Project>()
      .setRecords(project)
      .setTitle('getProjectById')
      .setMessage('Project was successfully found')
      .setStatus(200)
      .build();
  }

  async updateProject(user: UserDocument, project: ProjectDocument, updateProjectDto: UpdateProjectDto): Promise<ResponseEntity<Project>> {
    
    if(project.manager.toString() !== user._id.toString()) throw new ForbiddenException('Solo el manager puede editar un proyecto');
    
    const updatedProject = await this.projectModel.findByIdAndUpdate(project._id, updateProjectDto, { new: true })

    return new ResponseEntity<Project>()
      .setRecords(updatedProject)
      .setTitle('updateProject')
      .setMessage('Project was updated')
      .setStatus(200)
      .build();
  }

  async deleteProject(user: UserDocument, project: ProjectDocument): Promise<ResponseEntity<Project>> {

    if(project.manager.toString() !== user._id.toString()) throw new ForbiddenException('Solo el manager puede editar un proyecto');

    const deletedProject = await this.projectModel.findByIdAndDelete(project.id);

    if (!deletedProject) throw new NotFoundException(`Project with ID "${project.id}" not found`);

    return new ResponseEntity<Project>()
      .setRecords(deletedProject)
      .setTitle('deleteProject')
      .setMessage('Project was successfully deleted')
      .setStatus(200)
      .build();
  }
  
}
