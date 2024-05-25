import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './model/task.schema';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/projects/model/project.schema';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private readonly taskModel: ModelExt<TaskDocument>,
              @InjectModel(Project.name) private readonly projectModel: ModelExt<Project>) { }

  async createTask(project: ProjectDocument, createTaskDto: CreateTaskDto) {
    
    let newTask = await this.taskModel.create({...createTaskDto, project});

    let response = await this.projectModel.findByIdAndUpdate(
      project._id, 
      { tasks: [...project.tasks, newTask._id] }, 
      { new: true }
    );
    
    return response;
  }

}
