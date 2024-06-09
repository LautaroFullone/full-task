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


    async getProjectMemberByEmail(email: User['email']): Promise<ResponseEntity<User>> {

        const user = await this.userModel.findOne({ email }).select('_id name email')
        if (!user) throw new NotFoundException(`No fue encontrado un usuario con email "${email}"`);

        return new ResponseEntity<User>()
            .setRecords(user)
            .setTitle('getProjectMembersByEmail')
            .setMessage('Usuario encontrado')
            .setStatus(200)
            .build();
    }

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
            .setStatus(200)
            .build();
    }

}
