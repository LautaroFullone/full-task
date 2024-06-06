import { Injectable } from '@nestjs/common';
import { CreateRegisterTokenDto } from './dto/create-register-token.dto';
import { UpdateRegisterTokenDto } from './dto/update-register-token.dto';

@Injectable()
export class RegisterTokensService {
  create(createRegisterTokenDto: CreateRegisterTokenDto) {
    return 'This action adds a new registerToken';
  }

  findAll() {
    return `This action returns all registerTokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registerToken`;
  }

  update(id: number, updateRegisterTokenDto: UpdateRegisterTokenDto) {
    return `This action updates a #${id} registerToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} registerToken`;
  }
}
