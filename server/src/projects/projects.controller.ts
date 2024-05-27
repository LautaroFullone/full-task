import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { ObjectIdPipe } from 'src/utils/pipes/object-id/object-id.pipe';
import { ProjectExistsGuard } from 'src/guards/project-exists/project-exists.guard';
import { ProjectsService } from './projects.service';
import { RequestWithProyectValue } from 'src/middlewares/validate-project-exists.middleware';
import { TasksService } from 'src/tasks/tasks.service';
import { Types } from 'mongoose';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  
  constructor(private readonly projectsService: ProjectsService,
              private readonly tasksService: TasksService) { }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Post(':id/tasks') 
  createProjectTask(@Req() req: RequestWithProyectValue, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(req.project, createTaskDto);
  }

  @Get(':id/tasks')
  @UseGuards(ProjectExistsGuard)
  getAllProjectTasks(@Req() req: RequestWithProyectValue) {
    return this.tasksService.getAllTasksByProjectId(req.project._id);
  }

  @Get(':id/tasks/:taskID')
  @UseGuards(ProjectExistsGuard)
  getProjectTaskById(@Param('taskID', ObjectIdPipe) taskID: Types.ObjectId) {
      return this.tasksService.getProjectTaskById(taskID);     
  }

  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  @Get(':id')
  getProjectById(@Param('id', ObjectIdPipe) id: string) {
    return this.projectsService.getProjectById(id);
  }

  @Patch(':id')
  updateProject(@Param('id', ObjectIdPipe) id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  removeProject(@Param('id', new ObjectIdPipe()) id: string) {
    return this.projectsService.removeProject(id);
  }
}
