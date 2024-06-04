import { CreateTaskDto } from './dto/create-task.dto';
import { EmptyListException } from 'src/utils/exceptions/empty-list.exception';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from 'src/projects/model/project.schema';
import { ResponseEntity } from 'src/utils/responses';
import { Task, TaskDocument } from './model/task.schema';
import { InvalidRelationshipException } from 'src/utils/exceptions/invalid-relationship.exception';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class TasksService {
  
  constructor(@InjectModel(Task.name) private readonly taskModel: ModelExt<TaskDocument>,
              @InjectModel(Project.name) private readonly projectModel: ModelExt<TaskDocument>) { }
  
  async createTask(project: ProjectDocument, createTaskDto: CreateTaskDto): Promise<ResponseEntity<Task>> {
   
    const newTask = (await this.taskModel.create({ ...createTaskDto, project }))
    
    await this.projectModel.findByIdAndUpdate(project._id, { tasks: [...project.tasks, newTask._id as Types.ObjectId] })

    return new ResponseEntity<Task>()
      .setRecords(newTask)
      .setTitle('createTask')
      .setMessage('Tasks was successfully created')
      .setStatus(200)
      .build();
  }
  
  async getAllTasksByProjectId(project: ProjectDocument): Promise<ResponseEntity<Task[]>>{
    
    const tasksList = await this.taskModel.find({ project: project._id }) 
    
    //if(tasksList.length == 0) throw new EmptyListException('tasks');
    
    return new ResponseEntity<Task[]>()
      .setRecords(tasksList)
      .setTitle('getAllTasksByProjectId')
      .setMessage('Tasks were successfully found')
      .setStatus(200)
      .build();
  }
  
  async getTaskById(task: TaskDocument): Promise<ResponseEntity<Task>>{
     
    return new ResponseEntity<Task>()
      .setRecords(task)
      .setTitle('getTaskById')
      .setMessage('Task was successfully found')
      .setStatus(200)
      .build();
  }
  
  async updateTask(task: TaskDocument, updateTaskDto: UpdateTaskDto) { 

    const taskUpdated = await this.taskModel.findByIdAndUpdate(task._id, updateTaskDto, { new: true })

    return new ResponseEntity<Task>()
      .setRecords(taskUpdated)
      .setTitle('updateTask')
      .setMessage('Task was updated')
      .setStatus(200)
      .build();
  }
  
  async updateTaskStatus(task: TaskDocument, { status: newStatus }: UpdateTaskStatusDto): Promise<ResponseEntity<Task>>{

    task.status = newStatus
    
    const taskUpdated = await task.save();

    return new ResponseEntity<Task>()
      .setRecords(taskUpdated)
      .setTitle('updateTaskStatus')
      .setMessage('Task status was successfully updated')
      .setStatus(200)
      .build();
  }

  async deleteTask(project: ProjectDocument, taskToDelete: TaskDocument): Promise<ResponseEntity<Task>> {

    project.tasks = project.tasks.filter(t => t._id.toString() != taskToDelete._id.toString())

    await Promise.allSettled([
      this.taskModel.findByIdAndDelete(taskToDelete._id),
      project.save()
    ]);

    return new ResponseEntity<Task>()
      .setRecords(taskToDelete)
      .setTitle('deleteTask')
      .setMessage('Task was successfully deleted')
      .setStatus(200)
      .build();
  }

}
