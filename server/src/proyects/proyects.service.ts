import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Proyect, ProyectDocument } from './model/proyect.schema';
import { Model } from 'mongoose';

interface ModelExt<T> extends Model<T> {
  delete: Function;
}

@Injectable()
export class ProyectsService {

  constructor(@InjectModel(Proyect.name) private readonly proyectModel: ModelExt<ProyectDocument>) { }

  createProyect(createProyectDto: CreateProyectDto) {
    return this.proyectModel.create(createProyectDto);
  }

  getAllProyects() {
    return this.proyectModel.find();
  }

  async getProyectById(id: string) {
    const proyect = await this.proyectModel.findById(id);
    
    if (!proyect) throw new NotFoundException(`Project with ID "${id}" not found`);

    return proyect;
  }

  async updateProyect(id: string, updateProyectDto: UpdateProyectDto) {
    console.log('updateProyectDto', updateProyectDto)
    const updatedProyect = await this.proyectModel.findByIdAndUpdate(id, updateProyectDto)

    if (!updatedProyect) throw new NotFoundException(`Project with ID "${id}" not found`);

    return updatedProyect;
  }

  async removeProyect(id: string) {
    const deletedProyect = await this.proyectModel.findByIdAndDelete(id);

    if (!deletedProyect) throw new NotFoundException(`Project with ID "${id}" not found`);

    return deletedProyect;
  }
  
}
