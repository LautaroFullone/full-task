import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from 'src/tasks/model/task.schema';
import { InvalidRelationshipException } from 'src/utils/exceptions/invalid-relationship.exception';

@Injectable()
export class TaskExistsGuard implements CanActivate {

    constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const [req, _] = context.getArgs();
        const { project } = req;
        const { taskID } = req.params;

        if(!Types.ObjectId.isValid(taskID)) //duplico el pipe aqui ya que se ejecuta primero el guard
            throw new BadRequestException(`TASK GUARD: Invalid ID format: ${taskID}`);

        const task = await this.taskModel.findById(taskID);

        if(!task) throw new NotFoundException(`No se encontró una Tarea con el ID"${taskID}"`);

        if(!project) throw new NotFoundException(`No se encontró el Proyecto`);

        //si la task no pertenece al project enviado, lanza error
        if(task.project.toString() !== project._id.toString())
            throw new InvalidRelationshipException;

        req.task = task;

        return true;
    }
}
