import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task, TaskDocument } from 'src/tasks/model/task.schema';
import { UserDocument } from 'src/users/model/user.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {

    @Prop({ required: true, trim: true })
    content: string;

    @Prop({ type: Types.ObjectId, ref: 'Task' })
    task: TaskDocument;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy: UserDocument;

}

export const NoteSchema = SchemaFactory.createForClass(Note);