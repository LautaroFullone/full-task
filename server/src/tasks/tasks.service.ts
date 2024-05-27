import { CreateTaskDto } from './dto/create-task.dto';
import { EmptyListException } from 'src/utils/exceptions/empty-list.exception';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from 'src/projects/model/project.schema';
import { ResponseEntity } from 'src/utils/responses';
import { Task, TaskDocument } from './model/task.schema';
import { InvalidActionException } from 'src/utils/exceptions/invalid-action.exception';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private readonly taskModel: ModelExt<TaskDocument>,
              @InjectModel(Project.name) private readonly projectModel: ModelExt<Project>) { }


  async createTask(project: ProjectDocument, createTaskDto: CreateTaskDto): Promise<ResponseEntity<Task>> {
    
    let newTask = await this.taskModel.create({ ...createTaskDto, project });

    await this.projectModel.findByIdAndUpdate(
      project._id, 
      { tasks: [...project.tasks, newTask._id] }
    );

    return new ResponseEntity<Task>()
      .setData(newTask)
      .setTitle('createTask')
      .setMessage('Tasks was successfully created')
      .setStatus(200)
      .build();

  }

  async getAllTasksByProjectId(projectID: Types.ObjectId): Promise<ResponseEntity<Task[]>>{
    
    let tasksList = await this.taskModel.find({ project: projectID })
      .populate('project'); //se pone el nombre del campo
    
    if(tasksList.length == 0) throw new EmptyListException('tasks');

    return new ResponseEntity<Task[]>()
      .setData(tasksList)
      .setTitle('getAllTasksByProjectId')
      .setMessage('Tasks were successfully found')
      .setStatus(200)
      .build();
  }
  
  async getProjectTaskById(projectID: Types.ObjectId, taskID: Types.ObjectId): Promise<ResponseEntity<Task>>{
  
    let task = await this.taskModel.findById(taskID).populate('project'); 

    if (!task) throw new NotFoundException(`Task with ID "${taskID}" not found`);

    //si la task no pertenece al project enviado, lanza error
    if (task.project._id.toString() !== projectID.toString()) throw new InvalidActionException;

    return new ResponseEntity<Task>()
      .setData(task)
      .setTitle('getProjectTaskById')
      .setMessage('Task was successfully found')
      .setStatus(200)
      .build();
  }

}
