import { Module } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './model/project.schema';
import { TasksModule } from 'src/tasks/tasks.module';
import { Task, TaskSchema } from 'src/tasks/model/task.schema';
import { TeamModule } from 'src/team/team.module';
import { NotesModule } from 'src/notes/notes.module';
import { Note, NoteSchema } from 'src/notes/model/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Project.name, schema: ProjectSchema },
        { name: Task.name, schema: TaskSchema },
        { name: Note.name, schema: NoteSchema },
      ]
    ),
    TasksModule,
    TeamModule,
    NotesModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})

export class ProjectsModule {

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(ValidateProjectExistsMiddleware)
  //     .forRoutes(
  //       { path: 'projects/:id/tasks', method: RequestMethod.POST },
  //       { path: 'projects/:id/tasks', method: RequestMethod.GET },
  //       { path: 'projects/:id/tasks/:taskID', method: RequestMethod.GET },
  //     )
  // }
}
