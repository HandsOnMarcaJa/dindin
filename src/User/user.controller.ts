import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
