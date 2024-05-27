import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Observable } from 'rxjs';
import { Project, ProjectDocument } from 'src/projects/model/project.schema';

@Injectable()
export class ProjectExistsGuard implements CanActivate {

  constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const [req, _] = context.getArgs();  //otras maneras de obtener request
    //const req = context.switchToHttp().getRequest();

    const { id: projectID } = req.params;

    if (!projectID) throw new NotFoundException(`Project ID is missing`);

    if (!Types.ObjectId.isValid(projectID)) //duplico el pipe aqui ya que se ejecuta primero el guard
      throw new BadRequestException(`GUARD: Invalid ID format: ${projectID}`);
    
    const project = await this.projectModel.findById(projectID);

    if (!project) throw new NotFoundException(`Project with ID "${projectID}" not found`);

    req.project = project;

    return true;
  }
}
