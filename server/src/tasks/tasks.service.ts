import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './model/task.schema';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from 'src/projects/model/project.schema';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private readonly taskModel: ModelExt<TaskDocument>,
              @InjectModel(Project.name) private readonly projectModel: ModelExt<Project>) { }

  async createTask(project: ProjectDocument, createTaskDto: CreateTaskDto) {
    
    try{
      let newTask = await this.taskModel.create({ ...createTaskDto, project });

      let response = await this.projectModel.findByIdAndUpdate(
        project._id, 
        { tasks: [...project.tasks, newTask._id] }, 
        { new: true }
      );

      return 'Task correctly created';

    } catch(error: any){
      return 'Error in createTask'
    } 
  }

  async getTasksByProjectId(project: Types.ObjectId){
    try {
      let tasksList = await this.taskModel.find({ project: project._id }).populate('project'); //se pone el nombre del campo

      return tasksList;

    } catch (error: any) {
      return 'Error in getTasksByProjectId'
    }
  }

}
