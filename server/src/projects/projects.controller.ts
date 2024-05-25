import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';
import { ObjectIdPipe } from 'src/utils/pipes/object-id/object-id.pipe';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  
  constructor(private readonly projectsService: ProjectsService,
              private readonly tasksService: TasksService
  ) { }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Post(':id/tasks')
  createProjectTask(@Param('id', new ObjectIdPipe()) projectID: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(projectID, createTaskDto);
  }

  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  @Get(':id')
  getProjectById(@Param('id', new ObjectIdPipe()) id: string) {
    return this.projectsService.getProjectById(id);
  }

  @Patch(':id')
  updateProject(@Param('id', new ObjectIdPipe()) id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  removeproject(@Param('id', new ObjectIdPipe()) id: string) {
    return this.projectsService.removeProject(id);
  }
}
