import { CreateTaskDto } from './dto/create-task.dto';
import { EmptyListException } from 'src/utils/exceptions/empty-list.exception';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from 'src/projects/model/project.schema';
import { ResponseEntity } from 'src/utils/responses';
import { Task, TaskDocument, taskStatus } from './model/task.schema';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserDocument } from 'src/users/model/user.schema';

interface ModelExt<T> extends Model<T> {
    delete: Function;
}

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private readonly taskModel: ModelExt<TaskDocument>,
                @InjectModel(Project.name) private readonly projectModel: ModelExt<TaskDocument>) { }

    async createTask(project: ProjectDocument, createTaskDto: CreateTaskDto): Promise<ResponseEntity<Task>> {

        const newTask = await this.taskModel.create({ ...createTaskDto, project })

        await this.projectModel.findByIdAndUpdate(project._id, { tasks: [...project.tasks, newTask._id as Types.ObjectId] })

        return new ResponseEntity<Task>()
            .setRecords(newTask)
            .setTitle('createTask')
            .setMessage('La Tarea se creó correctamente')
            .setStatus(200)
            .build();
    }

    async getAllTasksByProjectId(project: ProjectDocument): Promise<ResponseEntity<Task[]>> {

        const tasksList = await this.taskModel.find({ project: project._id })

        return new ResponseEntity<Task[]>()
            .setRecords(tasksList)
            .setTitle('getAllTasksByProjectId')
            .setMessage('Las Tareas del usuario han sido encontradas')
            .setStatus(200)
            .build();
    }

    async getTaskById(taskID: TaskDocument['_id']): Promise<ResponseEntity<Task>> {

        const task = await this.taskModel.findById(taskID).populate({
            path: 'completedBy.user',
            model: 'User',
            select: '_id email name'
        })

        return new ResponseEntity<Task>()
            .setRecords(task)
            .setTitle('getTaskById')
            .setMessage('La Tarea ha sido encontrada')
            .setStatus(200)
            .build();
    }

    async updateTask(task: TaskDocument, updateTaskDto: UpdateTaskDto): Promise<ResponseEntity<Task>> {

        const taskUpdated = await this.taskModel.findByIdAndUpdate(task._id, updateTaskDto, { new: true })

        return new ResponseEntity<Task>()
            .setRecords(taskUpdated)
            .setTitle('updateTask')
            .setMessage('La Tarea ha sido actualizada')
            .setStatus(200)
            .build();
    }

    async updateTaskStatus(task: TaskDocument, newStatus: Task['status'], user: UserDocument): Promise<ResponseEntity<Task>> {

        task.status = newStatus;
        
        if(task.status !== taskStatus.PENDING)
            task.completedBy.push({ user: user._id, status: newStatus, _id: new Types.ObjectId() })

        const taskUpdated = await task.save();

        return new ResponseEntity<Task>()
            .setRecords(taskUpdated)
            .setTitle('updateTaskStatus')
            .setMessage('El estado de la Tarea ha sido actualizado')
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
            .setMessage('La tarea ha sido eliminada')
            .setStatus(200)
            .build();
    }

}
