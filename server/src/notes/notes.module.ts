import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './model/note.schema';
import { Task, TaskSchema } from 'src/tasks/model/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Note.name, schema: NoteSchema },
        { name: Task.name, schema: TaskSchema },
      ]
    ),
  ],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService]
})
export class NotesModule {}
