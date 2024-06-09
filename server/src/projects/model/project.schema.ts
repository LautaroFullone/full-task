import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task, TaskDocument } from 'src/tasks/model/task.schema';
import { UserDocument } from 'src/users/model/user.schema';

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
    tasks: TaskDocument[];

    @Prop({ type: Types.ObjectId, ref: 'User' })
    manager: UserDocument;

    @Prop({ type: [Types.ObjectId], ref: 'User' })
    team: UserDocument[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);