import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './model/task.schema';
import { Project, ProjectSchema } from 'src/projects/model/project.schema';
import { Note, NoteSchema } from 'src/notes/model/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Task.name, schema: TaskSchema },
        { name: Note.name, schema: NoteSchema },
        { name: Project.name, schema: ProjectSchema }
      ]
    ),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService] //exporto mi servicio cuando alguien importe el modulo completo 
})
export class TasksModule {}
 