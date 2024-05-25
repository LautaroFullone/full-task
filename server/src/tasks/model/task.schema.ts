import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Proyect } from 'src/proyects/model/proyect.schema';

export const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {

    @Prop({ required: true, trim: true })
    taskName: string;

    @Prop({ required: true, trim: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'Proyect' })
    proyect: Proyect;

    @Prop({ required: true, enum: Object.values(taskStatus), default: taskStatus.PENDING })
    status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);