import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task } from 'src/tasks/model/task.schema';

export type ProyectDocument = HydratedDocument<Proyect>;

@Schema({ timestamps: true })
export class Proyect {

    @Prop({ required: true, trim: true })
    proyectName: string;

    @Prop({ required: true, trim: true })
    clientName: string;

    @Prop({ required: true, trim: true })
    description: string;

    @Prop({ type: [Types.ObjectId], ref: 'Task' }) 
    tasks: Task[];
}

export const ProyectSchema = SchemaFactory.createForClass(Proyect);