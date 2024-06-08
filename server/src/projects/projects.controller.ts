import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { ObjectIdPipe } from 'src/utils/pipes/object-id/object-id.pipe';
import { ProjectExistsGuard } from 'src/utils/guards/project-exists/project-exists.guard';
import { ProjectsService } from './projects.service';
import { RequestWithProyectValue } from 'src/utils/middlewares/validate-project-exists.middleware';
import { TasksService } from 'src/tasks/tasks.service';
import { UpdateTaskStatusDto } from 'src/tasks/dto/update-task-status.dto';
import { ProjectDocument } from './model/project.schema';
import { ProjectReq } from 'src/utils/decorators/project-req/project-req.decorator';
import { TaskReq } from 'src/utils/decorators/task-req/task-req.decorator';
import { TaskDocument } from 'src/tasks/model/task.schema';
import { TaskExistsGuard } from 'src/utils/guards/task-exists/task-exists.guard';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserAutenticatedGuard } from 'src/utils/guards/user-autenticated/user-autenticated.guard';
import { UserReq } from 'src/utils/decorators/user-req/user-req.decorator';
import { UserDocument } from 'src/users/model/user.schema';

// @UseGuards(UserAutenticatedGuard)
@Controller('projects')
export class ProjectsController {
  
  constructor(private readonly projectsService: ProjectsService,
              private readonly tasksService: TasksService) { }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }
  
  @UseGuards(UserAutenticatedGuard)
  @Get()
  getAllProjects(@UserReq() user: UserDocument) {
    return this.projectsService.getAllProjects();
  }
    
  @Get(':projectID')
  getProjectById(@Param('projectID', ObjectIdPipe) projectID: string) {
    return this.projectsService.getProjectById(projectID);
  }

  @Patch(':projectID')
  @UseGuards(ProjectExistsGuard)
  updateProject(
    @ProjectReq() project: ProjectDocument,
    @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.updateProject(project, updateProjectDto);
  }
        
  @Delete(':projectID')
  deleteProject(@Param('projectID', new ObjectIdPipe()) projectID: string) {
    return this.projectsService.deleteProject(projectID);
  }
      
  //---------------------<[ TASKS ]>---------------------
      
  @Post(':projectID/tasks') 
  @UseGuards(ProjectExistsGuard)
  createTask(
    @Body() createTaskDto: CreateTaskDto, 
    @ProjectReq() project: ProjectDocument) { //es lo mismo que usar: @Req() req: RequestWithProyectValue -> req.project
      return this.tasksService.createTask(project, createTaskDto);
  }

  @Get(':projectID/tasks')
  @UseGuards(ProjectExistsGuard)
  getAllTasksByProjectId(@Req() req: RequestWithProyectValue) {
    return this.tasksService.getAllTasksByProjectId(req.project);
  }
    
  @Get(':projectID/tasks/:taskID')
  @UseGuards(ProjectExistsGuard, TaskExistsGuard)
  getTaskById(@TaskReq() task: TaskDocument) {
      return this.tasksService.getTaskById(task);     
  }
  
  @Patch(':projectID/tasks/:taskID')
  @UseGuards(ProjectExistsGuard, TaskExistsGuard)
  updateTask(
    @TaskReq() task: TaskDocument,
    @Body() updateTaskDto: UpdateTaskDto) { 
      return this.tasksService.updateTask(task, updateTaskDto);
  }

  @Patch(':projectID/tasks/:taskID/status')
  @UseGuards(ProjectExistsGuard, TaskExistsGuard)
  updateTaskStatus(
    @TaskReq() task: TaskDocument,
    @Body() status: UpdateTaskStatusDto) {
      return this.tasksService.updateTaskStatus(task, status);
  }

  @Delete(':projectID/tasks/:taskID')
  @UseGuards(ProjectExistsGuard, TaskExistsGuard)
  deleteTask(
    @TaskReq() task: TaskDocument,
    @ProjectReq() project: ProjectDocument) {
      return this.tasksService.deleteTask(project, task);
  }
}