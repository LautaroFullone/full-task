import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './model/task.schema';
import { Model } from 'mongoose';
import { Proyect } from 'src/proyects/model/proyect.schema';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private readonly taskModel: ModelExt<TaskDocument>,
              @InjectModel(Proyect.name) private readonly proyectModel: ModelExt<Proyect>) { }

  async createTask(proyectID: string , createTaskDto: CreateTaskDto) {
    console.log('create Task ')
    console.log('proyectID', proyectID,' | body: ',createTaskDto)

    const proyect = await this.proyectModel.findById(proyectID);

    if (!proyect) throw new NotFoundException(`Project with ID "${proyectID}" not found`);

    let newTask = await this.taskModel.create({...createTaskDto, proyect});
 
    proyect.tasks.push(newTask)
    let response = await proyect.save();
    
    return response;
  }

}
