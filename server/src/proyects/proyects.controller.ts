import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { ObjectIdPipe } from 'src/utils/pipes/object-id/object-id.pipe';

@Controller('proyects')
export class ProyectsController {
  constructor(private readonly proyectsService: ProyectsService) {}

  @Post()
  createProyect(@Body() createProyectDto: CreateProyectDto) {
    return this.proyectsService.createProyect(createProyectDto);
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
