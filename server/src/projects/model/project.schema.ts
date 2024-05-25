import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task } from 'src/tasks/model/task.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {

    @Prop({ required: true, trim: true })
    projectName: string;

    @Prop({ required: true, trim: true })
    clientName: string;

    @Prop({ required: true, trim: true })
    description: string;

    @Prop({ type: [Types.ObjectId], ref: 'Task' }) 
    tasks: Task[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);