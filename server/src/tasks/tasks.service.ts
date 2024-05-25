import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './model/task.schema';
import { Model } from 'mongoose';
import { Project } from 'src/projects/model/project.schema';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private readonly taskModel: ModelExt<TaskDocument>,
              @InjectModel(Project.name) private readonly projectModel: ModelExt<Project>) { }

  async createTask(projectID: string , createTaskDto: CreateTaskDto) {
    console.log('create Task ')
    console.log('projectID', projectID,' | body: ',createTaskDto)

    const project = await this.projectModel.findById(projectID);

    if (!project) throw new NotFoundException(`Project with ID "${projectID}" not found`);

    let newTask = await this.taskModel.create({...createTaskDto, project});
 
    project.tasks.push(newTask)
    let response = await project.save();
    
    return response;
  }

}
