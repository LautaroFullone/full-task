import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './model/note.schema';
import { Model, Types } from 'mongoose';
import { ResponseEntity } from 'src/utils/responses';
import { UserDocument } from 'src/users/model/user.schema';
import { Task, TaskDocument } from 'src/tasks/model/task.schema';
import { InvalidRelationshipException } from 'src/utils/exceptions/invalid-relationship.exception';

@Injectable()
export class NotesService {

    constructor(@InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
                @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) { }

    async createNote(createNoteDto: CreateNoteDto, user: UserDocument, task: TaskDocument): Promise<ResponseEntity<Note>> {

        const newNote = (await this.noteModel.create({ ...createNoteDto, task, createdBy: user._id })).depopulate('task')
        
        await this.taskModel.findByIdAndUpdate(task._id, { notes: [...task.notes, newNote._id as Types.ObjectId] })
        
        return new ResponseEntity<Note>()
            .setRecords(newNote)
            .setTitle('createNote')
            .setMessage('Nota creada correctamente')
            .setStatus(204)
            .build();
    }

    async getAllNotesByTaskId(task: TaskDocument): Promise<ResponseEntity<Note[]>> {

        const noteList = await this.noteModel.find({ task: task._id })

        return new ResponseEntity<Note[]>()
            .setRecords(noteList)
            .setTitle('getAllTasksByTaskId')
            .setMessage('Notas encontradas')
            .setStatus(200)
            .build();
    }

    async deleteNote(noteID: NoteDocument['_id'], user: UserDocument, task: TaskDocument): Promise<ResponseEntity<Note>> {

        const noteToDelete = await this.noteModel.findById(noteID)

        if (!noteToDelete) throw new NotFoundException(`No se encontró una Nota con ID ${noteID}`);

        if (noteToDelete.createdBy.toString() !== user._id.toString())
            throw new InvalidRelationshipException;

        task.notes = task.notes.filter(notes => notes._id.toString() != noteToDelete._id.toString())

        await Promise.allSettled([
            await noteToDelete.deleteOne(),
            task.save()
        ]);

        return new ResponseEntity<Note>()
            .setRecords(noteToDelete)
            .setTitle('deleteNote')
            .setMessage('Nota eliminada correctamente')
            .setStatus(200)
            .build();
    }
}
