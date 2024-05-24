import { Module } from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { ProyectsController } from './proyects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyect, ProyectSchema } from './model/proyect.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Proyect.name, schema: ProyectSchema }
      ]
    ),
  ],
  controllers: [ProyectsController],
  providers: [ProyectsService],
})
export class ProyectsModule {}
