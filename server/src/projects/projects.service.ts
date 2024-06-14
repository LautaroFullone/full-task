import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from '../projects/model/project.schema';
import { Model } from 'mongoose';
import { ResponseEntity } from 'src/utils/responses';
import { UserDocument } from 'src/users/model/user.schema';
import { Task, TaskDocument } from 'src/tasks/model/task.schema';
import { Note, NoteDocument } from 'src/notes/model/note.schema';

interface ModelExt<T> extends Model<T> {
    delete: Function;
}

@Injectable()
export class ProjectsService {

    constructor(@InjectModel(Project.name) private readonly projectModel: ModelExt<ProjectDocument>,
                @InjectModel(Task.name) private readonly taskModel: ModelExt<TaskDocument>,
                @InjectModel(Note.name) private readonly noteModel: ModelExt<NoteDocument>) { }

    async createProject(user: UserDocument, createProjectDto: CreateProjectDto): Promise<ResponseEntity<Project>> {

        const newProject = await this.projectModel.create({ ...createProjectDto, manager: user._id });

        return new ResponseEntity<Project>()
            .setRecords(newProject)
            .setTitle('createProject')
            .setMessage('Project was successfully created')
            .setStatus(200)
            .build();
    }

    async getAllProjects(user: UserDocument): Promise<ResponseEntity<Project[]>> {

        const projectsList = await this.projectModel.find({
            $or: [
                { manager: user._id },
                { team: { $in: [user._id] } }
            ]
        }).populate('tasks');

        return new ResponseEntity<Project[]>()
            .setRecords(projectsList)
            .setTitle('getAllProjects')
            .setMessage('Projects were successfully found')
            .setStatus(200)
            .build();
    }

    async getProjectById(user: UserDocument, id: ProjectDocument['_id']): Promise<ResponseEntity<Project>> {

        const project = await this.projectModel.findById(id)
            .populate('tasks')
            .populate({ 
                path: 'tasks',
                populate: {
                    path: 'completedBy.user',
                    model: 'User',
                    select: '_id email name'
                } 
            }) 
            .populate({ 
                path: 'tasks',
                populate: {
                    path: 'notes',
                    model: 'Note',
                    populate: {
                        path: 'createdBy',
                        model: 'User',
                        select: '_id email name'
                    }
                } 
            })

        if(!project) throw new NotFoundException(`Project with ID "${id}" not found`);
        
        if(project.manager.toString() !== user._id.toString()
            && !project.team.includes(user.id)) 
                throw new ForbiddenException(`El usuario no tiene los permisos suficientes`);

        return new ResponseEntity<Project>()
            .setRecords(project)
            .setTitle('getProjectById')
            .setMessage('Project was successfully found')
            .setStatus(200)
            .build();
    }

    async updateProject(user: UserDocument, project: ProjectDocument, updateProjectDto: UpdateProjectDto): Promise<ResponseEntity<Project>> {

        if(project.manager.toString() !== user._id.toString()) 
            throw new ForbiddenException('Solo el manager puede editar un proyecto');

        const updatedProject = await this.projectModel.findByIdAndUpdate(project._id, updateProjectDto, { new: true })

        return new ResponseEntity<Project>()
            .setRecords(updatedProject)
            .setTitle('updateProject')
            .setMessage('Project was updated')
            .setStatus(200)
            .build();
    }

    async deleteProject(user: UserDocument, project: ProjectDocument): Promise<ResponseEntity<Project>> {

        if(project.manager.toString() !== user._id.toString()) 
            throw new ForbiddenException('Solo el manager puede eliminar un proyecto');

        const tasks = await this.taskModel.find({ project: project._id });
        const taskIds = tasks.map(task => task._id);

        await Promise.allSettled([
            this.projectModel.findByIdAndDelete(project._id),
            this.taskModel.deleteMany({ project: project._id }),
            this.noteModel.deleteMany({ task: { $in: taskIds } })
        ]);

        return new ResponseEntity<Project>()
            .setRecords(project)
            .setTitle('deleteProject')
            .setMessage('El Proyecto se elimino correctamente')
            .setStatus(200)
            .build();
    }

}
