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
  // getAllProyects() {
  //   return this.tasksService.getAllTask();
  // }

  // @Get(':id')
  // getProyectById(@Param('id', new ObjectIdPipe()) id: string) {
  //   return this.tasksService.getProyectById(id);
  // }

  // @Patch(':id')
  // updateProyect(@Param('id', new ObjectIdPipe()) id: string, @Body() updateProyectDto: UpdateProyectDto) {
  //   return this.tasksService.updateProyect(id, updateProyectDto);
  // }

  // @Delete(':id')
  // removeProyect(@Param('id', new ObjectIdPipe()) id: string) {
  //   return this.tasksService.removeProyect(id);
  // }
}
