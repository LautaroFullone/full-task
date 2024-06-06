import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegisterTokensService } from './register-tokens.service';
import { CreateRegisterTokenDto } from './dto/create-register-token.dto';
import { UpdateRegisterTokenDto } from './dto/update-register-token.dto';

@Controller('register-tokens')
export class RegisterTokensController {
  constructor(private readonly registerTokensService: RegisterTokensService) {}

  @Post()
  create(@Body() createRegisterTokenDto: CreateRegisterTokenDto) {
    return this.registerTokensService.create(createRegisterTokenDto);
  }

  @Get()
  findAll() {
    return this.registerTokensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registerTokensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterTokenDto: UpdateRegisterTokenDto) {
    return this.registerTokensService.update(+id, updateRegisterTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerTokensService.remove(+id);
  }
}
