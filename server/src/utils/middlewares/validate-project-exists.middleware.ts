import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/projects/model/project.schema';

export interface RequestWithProyectValue extends Request {
  project: ProjectDocument;
} //esto lo reemplazamos por el decorator de ProjectReq

@Injectable()
export class ValidateProjectExistsMiddleware implements NestMiddleware {

  constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) { }
  
  async use(req: RequestWithProyectValue, res: Response, next: NextFunction) {
    
    const { id: projectID } = req.params;

    if (!projectID) {
      throw new NotFoundException(`Project ID is missing`);
    }

    const project = await this.projectModel.findById(projectID);

    if (!project) throw new NotFoundException(`Project with ID "${projectID}" not found`);

    req.project = project;

    next();
  }
}
