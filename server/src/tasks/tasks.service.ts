import { CreateTaskDto } from './dto/create-task.dto';
import { EmptyListException } from 'src/utils/exceptions/empty-list.exception';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDocument } from 'src/projects/model/project.schema';
import { ResponseEntity } from 'src/utils/responses';
import { Task, TaskDocument } from './model/task.schema';
import { InvalidActionException } from 'src/utils/exceptions/invalid-action.exception';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class TasksService {
  
  constructor(@InjectModel(Task.name) private readonly taskModel: ModelExt<TaskDocument>) { }
  

  async createTask(project: ProjectDocument, createTaskDto: CreateTaskDto): Promise<ResponseEntity<Task>> {
    
    let newTask = await this.taskModel.create({ ...createTaskDto, project });

    project.tasks = [...project.tasks, newTask] 
    
    await project.save();
    
    return new ResponseEntity<Task>()
      .setData(newTask)
      .setTitle('createTask')
      .setMessage('Tasks was successfully created')
      .setStatus(200)
      .build();
  }
  
  async getAllTasksByProjectId(project: ProjectDocument): Promise<ResponseEntity<Task[]>>{
    
    let tasksList = await this.taskModel.find({ project: project._id })
      .populate('project'); //se pone el nombre del campo
    
    if(tasksList.length == 0) throw new EmptyListException('tasks');
    
    return new ResponseEntity<Task[]>()
      .setData(tasksList)
      .setTitle('getAllTasksByProjectId')
      .setMessage('Tasks were successfully found')
      .setStatus(200)
      .build();
  }
  
  async getTaskById(project: ProjectDocument, task: TaskDocument): Promise<ResponseEntity<Task>>{
    
    //si la task no pertenece al project enviado, lanza error
    if (task.project._id.toString() !== project._id.toString()) 
      throw new InvalidActionException;
    
    return new ResponseEntity<Task>()
      .setData(task)
      .setTitle('getTaskById')
      .setMessage('Task was successfully found')
      .setStatus(200)
      .build();
  }
  
  async updateTask(project: ProjectDocument, task: TaskDocument, updateTaskDto: UpdateTaskDto) {
    
    //si la task no pertenece al project enviado, lanza error
    if (task.project._id.toString() !== project._id.toString()) 
      throw new InvalidActionException; 

    const taskUpdated = await this.taskModel.findByIdAndUpdate(task._id, updateTaskDto, { new: true })

    return new ResponseEntity<Task>()
      .setData(taskUpdated)
      .setTitle('updateTask')
      .setMessage('Task was updated')
      .setStatus(200)
      .build();
  }
  
  async updateTaskStatus(project: ProjectDocument, task: TaskDocument, { status: newStatus }: UpdateTaskStatusDto): Promise<ResponseEntity<Task>>{

    if (task.project._id.toString() !== project._id.toString()) 
      throw new InvalidActionException;

    task.status = newStatus
    
    const taskUpdated = await task.save();

    return new ResponseEntity<Task>()
      .setData(taskUpdated)
      .setTitle('updateTaskStatus')
      .setMessage('Task status was successfully updated')
      .setStatus(200)
      .build();
  }

  async deleteTask(project: ProjectDocument, taskToDelete: TaskDocument): Promise<ResponseEntity<Task>> {

    //si la task no pertenece al project enviado, lanza error
    if (taskToDelete.project._id.toString() !== project._id.toString()) 
      throw new InvalidActionException;

    project.tasks = project.tasks.filter(t => t._id.toString() != taskToDelete._id.toString())

    await Promise.allSettled([
      this.taskModel.findByIdAndDelete(taskToDelete._id),
      project.save()
    ]);

    return new ResponseEntity<Task>()
      .setData(taskToDelete)
      .setTitle('deleteTask')
      .setMessage('Task was successfully deleted')
      .setStatus(200)
      .build();
  }

}
