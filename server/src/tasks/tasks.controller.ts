import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto) {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Get()
  // getAllProjects() {
  //   return this.tasksService.getAllTask();
  // }

  // @Get(':id')
  // getProjectById(@Param('id', new ObjectIdPipe()) id: string) {
  //   return this.tasksService.getProjectById(id);
  // }

  // @Patch(':id')
  // updateProject(@Param('id', new ObjectIdPipe()) id: string, @Body() updateprojectDto: UpdateprojectDto) {
  //   return this.tasksService.updateProject(id, updateProjectDto);
  // }

  // @Delete(':id')
  // removeProject(@Param('id', new ObjectIdPipe()) id: string) {
  //   return this.tasksService.removeProject(id);
  // }
}
