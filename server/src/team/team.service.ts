import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from 'src/projects/model/project.schema';
import { User, UserDocument } from 'src/users/model/user.schema';
import { ResponseEntity } from 'src/utils/responses';

@Injectable()
export class TeamService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
                @InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) { }

    async addProjectMember(userID: UserDocument['_id'], project: ProjectDocument): Promise<ResponseEntity<User>> {
        
        const user = await this.userModel.findById(userID).select('_id name email')
        if (!user) throw new NotFoundException(`No fue encontrado un usuario con ID "${userID}"`);

        if(project.team.some(member => member._id.toString() === userID.toString()))
            throw new ConflictException('El usuario ya existe en el proyecto')

        await this.projectModel.findByIdAndUpdate(project._id, { team: [...project.team, user._id as Types.ObjectId] })

        return new ResponseEntity<User>()
            .setRecords(user)
            .setTitle('addProjectMember')
            .setMessage('Usuario agregado al equipo correctamente')
            .setStatus(201)
            .build();
    }

    async getAllProjectMembers(projectID: ProjectDocument['_id']): Promise<ResponseEntity<User[]>> {

        const { team } = await this.projectModel.findById(projectID).select('team').populate({
            path: 'team',
            select: 'id name email'
        })

        return new ResponseEntity<User[]>()
            .setRecords(team)
            .setTitle('getAllProjectMembers')
            .setMessage('Usuarios encontrados correctamente')
            .setStatus(200)
            .build();
    }

    async getProjectMemberByEmail(email: User['email']): Promise<ResponseEntity<User>> {

        const user = await this.userModel.findOne({ email }).select('_id name email')
        if (!user) throw new NotFoundException(`No fue encontrado un usuario con email "${email}"`);

        return new ResponseEntity<User>()
            .setRecords(user)
            .setTitle('getProjectMemberByEmail')
            .setMessage('Usuario encontrado')
            .setStatus(200)
            .build();
    }

    async deleteProjectMember(userID: UserDocument['_id'], project: ProjectDocument): Promise<ResponseEntity<User>> {
        
        const user = await this.userModel.findById(userID).select('_id name email')
        if (!user) throw new NotFoundException(`No fue encontrado un usuario con ID "${userID}"`);

        if (!project.team.some(member => member._id.toString() === userID.toString()))
            throw new ConflictException('El usuario no existe en el proyecto')

        const newProjectTeam = project.team.filter(member => member._id.toString() !== userID.toString())

        await this.projectModel.findByIdAndUpdate(project._id, { team: newProjectTeam })

        return new ResponseEntity<User>()
            .setRecords(user)
            .setTitle('deleteProjectMember')
            .setMessage('Usuario eliminado del equipo correctamente')
            .setStatus(200)
            .build();
    }

}
