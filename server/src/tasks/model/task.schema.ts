import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProjectDocument } from 'src/projects/model/project.schema';

export const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export type TaskDocument = HydratedDocument<Task>;

const CompletedBy = {
    user: Types.ObjectId,
    taskStatus: Object.values(taskStatus) 
} 
@Schema({ timestamps: true })
export class Task {

    @Prop({ required: true, trim: true })
    taskName: string;

    @Prop({ required: true, trim: true })
    description: string;

    @Prop({ required: true, enum: Object.values(taskStatus), default: taskStatus.PENDING })
    status: TaskStatus;

    @Prop({ type: Types.ObjectId, ref: 'Project' })
    project: ProjectDocument;

    // @Prop({ type: Types.ObjectId, ref: 'User' })
    // completedBy: UserDocument;

    @Prop({ type: [CompletedBy], default: [], ref:'User' })
    completedBy: [{
        user: Types.ObjectId,
        taskStatus: TaskStatus
    }];
}

export const TaskSchema = SchemaFactory.createForClass(Task);