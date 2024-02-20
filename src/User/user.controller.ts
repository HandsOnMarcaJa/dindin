import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import {
  CreateUserBodyDTO,
  createUserBodyPipeValidator,
} from './DTO/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body(createUserBodyPipeValidator) data: CreateUserBodyDTO) {
    return this.userService.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
