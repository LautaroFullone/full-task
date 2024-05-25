import { Module } from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { ProyectsController } from './proyects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyect, ProyectSchema } from './model/proyect.schema';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Proyect.name, schema: ProyectSchema }
      ]
    ),
    TasksModule
  ],
  controllers: [ProyectsController],
  providers: [ProyectsService],
})
export class ProyectsModule {}
