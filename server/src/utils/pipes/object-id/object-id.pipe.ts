import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdPipe implements PipeTransform {
  
  transform(value: string, metadata: ArgumentMetadata) {

    console.log('# ObjectIdPipe')
    
    if (!Types.ObjectId.isValid(value)) 
      throw new BadRequestException(`PIPE: Invalid ID format: ${value}`);

    return new Types.ObjectId(value);
  }
}
