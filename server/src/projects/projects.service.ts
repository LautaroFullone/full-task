import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from '../projects/model/project.schema';
import { Model } from 'mongoose';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class ProjectsService {

  constructor(@InjectModel(Project.name) private readonly projectModel: ModelExt<ProjectDocument>) { }

  createProject(createProjectDto: CreateProjectDto) {
    return this.projectModel.create(createProjectDto);
  }

  getAllProjects() {
    return this.projectModel.find();
  }

  async getProjectById(id: string) {
    const project = await this.projectModel.findById(id).populate('tasks');
    
    if (!project) throw new NotFoundException(`Project with ID "${id}" not found`);

    return project;
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto)

    if (!updatedProject) throw new NotFoundException(`Project with ID "${id}" not found`);

    return updatedProject;
  }

  async deleteProject(id: string) {
    const deletedProject = await this.projectModel.findByIdAndDelete(id);

    if (!deletedProject) throw new NotFoundException(`Project with ID "${id}" not found`);

    return deletedProject;
  }
  
}
