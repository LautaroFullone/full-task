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
import { HasAutorizationGuard } from 'src/utils/guards/has-autorization/has-autorization.guard';
import { NotesService } from 'src/notes/notes.service';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';

@UseGuards(UserAutenticatedGuard)
@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectsService: ProjectsService,
                private readonly tasksService: TasksService,
                private readonly teamService: TeamService,
                private readonly notesService: NotesService) { }

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
    @UseGuards(ProjectExistsGuard)
    deleteProject(@UserReq() user: UserDocument,
                  @ProjectReq() project: ProjectDocument) {
        return this.projectsService.deleteProject(user, project);
    }

    //---------------------<[ TASKS ]>---------------------

    @Post(':projectID/tasks')
    @UseGuards(ProjectExistsGuard, HasAutorizationGuard)
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
        return this.tasksService.getTaskById(task._id);
    }

    @Patch(':projectID/tasks/:taskID')
    @UseGuards(ProjectExistsGuard, TaskExistsGuard, HasAutorizationGuard)
    updateTask(
        @TaskReq() task: TaskDocument,
        @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.updateTask(task, updateTaskDto);
    }

    @Patch(':projectID/tasks/:taskID/status')
    @UseGuards(ProjectExistsGuard, TaskExistsGuard)
    updateTaskStatus(
        @TaskReq() task: TaskDocument,
        @UserReq() user: UserDocument,
        @Body() status: UpdateTaskStatusDto) {
        return this.tasksService.updateTaskStatus(task, status.status, user);
    }

    @Delete(':projectID/tasks/:taskID')
    @UseGuards(ProjectExistsGuard, TaskExistsGuard, HasAutorizationGuard)
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
        
    @Post(':projectID/team/find')
    @UseGuards(ProjectExistsGuard)
    getProjectMemberByEmail(@Body() emailAuthDto: EmailAuthDto) { 
        return this.teamService.getProjectMemberByEmail(emailAuthDto.email);
    }

    @Delete(':projectID/team/:userID')
    @UseGuards(ProjectExistsGuard)
    deleteProjectMember(@ProjectReq() project: ProjectDocument,
                        @Param('userID', ObjectIdPipe) userID: UserDocument['_id']) {
        return this.teamService.deleteProjectMember(userID, project);
    }

    //---------------------<[ TASKS ]>---------------------

    @Post(':projectID/tasks/:taskID/notes')
    @UseGuards(ProjectExistsGuard, TaskExistsGuard)
    createNote(@TaskReq() task: TaskDocument,
               @UserReq() user: UserDocument,
               @Body() createNote: CreateNoteDto) { 
        return this.notesService.createNote(createNote, user, task);
    }
    
    @Get(':projectID/tasks/:taskID/notes')
    @UseGuards(ProjectExistsGuard, TaskExistsGuard)
    getAllNotesByTaskId(@TaskReq() task: TaskDocument){
        return this.notesService.getAllNotesByTaskId(task);
    }

    @Delete(':projectID/tasks/:taskID/notes/:noteID')
    @UseGuards(ProjectExistsGuard, TaskExistsGuard, HasAutorizationGuard)
    deleteNote(@TaskReq() task: TaskDocument,
               @UserReq() user: UserDocument,
               @Param('noteID', ObjectIdPipe) noteID: UserDocument['_id']) {
        return this.notesService.deleteNote(noteID, user, task);
    }
}