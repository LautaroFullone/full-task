import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './model/note.schema';
import { Model, Types } from 'mongoose';
import { ResponseEntity } from 'src/utils/responses';
import { UserDocument } from 'src/users/model/user.schema';
import { TaskDocument } from 'src/tasks/model/task.schema';

@Injectable()
export class NotesService {

    constructor(@InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
                @InjectModel(Note.name) private readonly taskModel: Model<TaskDocument>) { }

    async createNote(createNoteDto: CreateNoteDto, user: UserDocument, task: TaskDocument): Promise<ResponseEntity<Note>> {

        const newNote = await (await this.noteModel.create({ ...createNoteDto, task, createdBy: user._id })).depopulate('task')
        
        await this.taskModel.findByIdAndUpdate(task._id, { notes: [...task.notes, newNote._id as Types.ObjectId] })

        return new ResponseEntity<Note>()
            .setRecords(newNote)
            .setTitle('createNote')
            .setMessage('La Nota se creó correctamente')
            .setStatus(200)
            .build();
    }
}
