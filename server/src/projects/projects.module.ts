import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './model/project.schema';
import { TasksModule } from 'src/tasks/tasks.module';
import { ValidateprojectExistsMiddleware } from 'src/middlewares/validate-project-exists.middleware';

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
    consumer.apply(ValidateprojectExistsMiddleware).forRoutes(':id/tasks');

  }
}
