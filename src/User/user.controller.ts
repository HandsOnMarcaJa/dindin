import {
  Body,
  Controller,
  Delete,
  Request,
  Param,
  Post,
  Patch,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserBodyDTO,
  createUserBodyPipeValidator,
} from './DTO/create-user.dto';
import {
  UpdateUserBodyDTO,
  updateUserBodyPipeValidator,
} from './DTO/update-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(createUserBodyPipeValidator) data: CreateUserBodyDTO) {
    return this.userService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(updateUserBodyPipeValidator) data: UpdateUserBodyDTO,
  ) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
