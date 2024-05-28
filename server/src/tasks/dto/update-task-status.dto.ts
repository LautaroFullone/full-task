import { IsEnum } from 'class-validator';
import { TaskStatus, taskStatus } from '../model/task.schema';

export class UpdateTaskStatusDto {
    
    @IsEnum(taskStatus)
    status: TaskStatus;
}