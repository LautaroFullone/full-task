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
import { User, UserDocument } from 'src/users/model/user.schema';
import { EmailAuthDto } from 'src/auth/dto/email-auth.dto';
import { TeamService } from 'src/team/team.service';
import { IdAuthDto } from 'src/auth/dto/id-auth.dto';
import { Types } from 'mongoose';

@UseGuards(UserAutenticatedGuard)
@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectsService: ProjectsService,
                private readonly tasksService: TasksService,
                private readonly teamService: TeamService) { }

    @Post()
    createProject(@UserReq() user: UserDocument,
                  @Body() createProjectDto: CreateProjectDto) {

        return this.projectsService.createProject(user, createProjectDto);
    }

    @Get()
    getAllProjects(@UserReq() user: UserDocument) {
        return this.projectsService.getAllProjects(user);
    }

    @Get(':projectID')
    getProjectById(@UserReq() user: UserDocument,
                   @Param('projectID', ObjectIdPipe) projectID: ProjectDocument['_id']) {

        return this.projectsService.getProjectById(user, projectID);
    }

    @Patch(':projectID')
    @UseGuards(ProjectExistsGuard)
    updateProject(@UserReq() user: UserDocument,
                  @ProjectReq() project: ProjectDocument,
                  @Body() updateProjectDto: UpdateProjectDto) {

        return this.projectsService.updateProject(user, project, updateProjectDto);
    }

    @Delete(':projectID')
    deleteProject(@UserReq() user: UserDocument,
                  @ProjectReq() project: ProjectDocument) {
        return this.projectsService.deleteProject(user, project);
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
        return this.tasksService.updateTaskStatus(task, status.status);
    }

    @Delete(':projectID/tasks/:taskID')
    @UseGuards(ProjectExistsGuard, TaskExistsGuard)
    deleteTask(
        @TaskReq() task: TaskDocument,
        @ProjectReq() project: ProjectDocument) {
        return this.tasksService.deleteTask(project, task);
    }

    //---------------------<[ TEAM ]>---------------------
    
    @Post(':projectID/team')
    @UseGuards(ProjectExistsGuard)
    addProjectMember(@Body() idAuthDto: IdAuthDto, 
                     @ProjectReq() project: ProjectDocument) { 
        return this.teamService.addProjectMember(idAuthDto.id, project);
    }

    @Get(':projectID/team')
    @UseGuards(ProjectExistsGuard)
    getAllProjectMembers(@ProjectReq() project: ProjectDocument) {
        return this.teamService.getAllProjectMembers(project._id);
    }
        
    @Get(':projectID/team/find')
    @UseGuards(ProjectExistsGuard)
    getProjectMemberByEmail(@Body() emailAuthDto: EmailAuthDto) { 
        return this.teamService.getProjectMemberByEmail(emailAuthDto.email);
    }

    @Delete(':projectID/team')
    @UseGuards(ProjectExistsGuard)
    deleteProjectMember(@Body() idAuthDto: IdAuthDto,
                        @ProjectReq() project: ProjectDocument) {
        return this.teamService.deleteProjectMember(idAuthDto.id, project);
    }
}