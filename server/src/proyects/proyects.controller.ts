import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { ObjectIdPipe } from 'src/utils/pipes/object-id/object-id.pipe';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('proyects')
export class ProyectsController {
  
  constructor(private readonly proyectsService: ProyectsService,
              private readonly tasksService: TasksService
  ) { }

  @Post()
  createProyect(@Body() createProyectDto: CreateProyectDto) {
    return this.proyectsService.createProyect(createProyectDto);
  }

  @Post(':id/tasks')
  createProyectTask(@Param('id', new ObjectIdPipe()) proyectID: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(proyectID, createTaskDto);
  }

  @Get()
  getAllProyects() {
    return this.proyectsService.getAllProyects();
  }

  @Get(':id')
  getProyectById(@Param('id', new ObjectIdPipe()) id: string) {
    return this.proyectsService.getProyectById(id);
  }

  @Patch(':id')
  updateProyect(@Param('id', new ObjectIdPipe()) id: string, @Body() updateProyectDto: UpdateProyectDto) {
    return this.proyectsService.updateProyect(id, updateProyectDto);
  }

  @Delete(':id')
  removeProyect(@Param('id', new ObjectIdPipe()) id: string) {
    return this.proyectsService.removeProyect(id);
  }
}
