import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { ObjectIdPipe } from 'src/utils/pipes/object-id/object-id.pipe';
import { ProjectExistsGuard } from 'src/guards/project-exists/project-exists.guard';
import { ProjectsService } from './projects.service';
import { RequestWithProyectValue } from 'src/middlewares/validate-project-exists.middleware';
import { TasksService } from 'src/tasks/tasks.service';
import { UpdateTaskStatusDto } from 'src/tasks/dto/update-task-status.dto';
import { ProjectDocument } from './model/project.schema';
import { ProjectReq } from 'src/utils/decorators/project-req/project-req.decorator';
import { TaskReq } from 'src/utils/decorators/task-req/task-req.decorator';
import { TaskDocument } from 'src/tasks/model/task.schema';
import { TaskExistsGuard } from 'src/guards/task-exists/task-exists.guard';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';

@Controller('projects')
export class ProjectsController {
  
  constructor(private readonly projectsService: ProjectsService,
              private readonly tasksService: TasksService) { }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }
  
  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }
    
  @Get(':id')
  getProjectById(@Param('id', ObjectIdPipe) id: string) {
    return this.projectsService.getProjectById(id);
  }
        
  @Delete(':id')
  deleteProject(@Param('id', new ObjectIdPipe()) id: string) {
    return this.projectsService.deleteProject(id);
  }
      
  //--------------------- TASKS ---------------------
      
  @Post(':id/tasks') 
  @UseGuards(ProjectExistsGuard)
  createTask(
    @Body() createTaskDto: CreateTaskDto, 
    @ProjectReq() project: ProjectDocument) { //es lo mismo que usar: @Req() req: RequestWithProyectValue -> req.project
      return this.tasksService.createTask(project, createTaskDto);
  }

  @Get(':id/tasks')
  @UseGuards(ProjectExistsGuard)
  getAllTasksByProjectId(@Req() req: RequestWithProyectValue) {
    return this.tasksService.getAllTasksByProjectId(req.project);
  }
    
  @Get(':id/tasks/:taskID')
  @UseGuards(ProjectExistsGuard, TaskExistsGuard)
  getTaskById(
    @TaskReq() task: TaskDocument,
    @ProjectReq() project: ProjectDocument,) {
      return this.tasksService.getTaskById(project, task);     
  }
  
  @Patch(':id/tasks/:taskID')
  @UseGuards(ProjectExistsGuard, TaskExistsGuard)
  updateTask(
    @TaskReq() task: TaskDocument,
    @ProjectReq() project: ProjectDocument, 
    @Body() updateTaskDto: UpdateTaskDto) { 
      return this.tasksService.updateTask(project, task, updateTaskDto);
  }

  @Patch(':id/tasks/:taskID/status')
  @UseGuards(ProjectExistsGuard, TaskExistsGuard)
  updateTaskStatus(
    @TaskReq() task: TaskDocument,
    @ProjectReq() project: ProjectDocument,
    @Body() status: UpdateTaskStatusDto) {
      return this.tasksService.updateTaskStatus(project, task, status);
  }

  @Delete(':id/tasks/:taskID')
  @UseGuards(ProjectExistsGuard, TaskExistsGuard)
  deleteTask(
    @TaskReq() task: TaskDocument,
    @ProjectReq() project: ProjectDocument) {
      return this.tasksService.deleteTask(project, task);
  }
}