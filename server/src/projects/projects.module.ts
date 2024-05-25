import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './model/project.schema';
import { TasksModule } from 'src/tasks/tasks.module';
import { ValidateProjectExistsMiddleware } from 'src/middlewares/validate-project-exists.middleware';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Project.name, schema: ProjectSchema }
      ]
    ),
    TasksModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})

export class ProjectsModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateProjectExistsMiddleware)
      .forRoutes({ path: 'projects/:id/tasks', method: RequestMethod.POST })
  }
}
