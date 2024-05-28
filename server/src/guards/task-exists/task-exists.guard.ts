import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from 'src/tasks/model/task.schema';

@Injectable()
export class TaskExistsGuard implements CanActivate {
  
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const [req, _] = context.getArgs(); 
    const { taskID } = req.params;

    if (!Types.ObjectId.isValid(taskID)) //duplico el pipe aqui ya que se ejecuta primero el guard
      throw new BadRequestException(`GUARD: Invalid ID format: ${taskID}`);

    const task = await this.taskModel.findById(taskID);

    if (!task) throw new NotFoundException(`Task with ID "${taskID}" not found`);

    req.task = task;

    return true;
  }
}
