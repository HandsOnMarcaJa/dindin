import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Patch,
  Get,
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
import { Public } from 'src/auth/public.decorator';
import {
  LoginUserBodyDTO,
  loginUserBodyValidation,
} from './DTO/login-user-dto';
import { CurrentLoggedUserDecorator } from 'src/auth/currentLoggeduser.decorator';
import { TokenPayloadSchema } from 'src/auth/jwtStrateg.strategy';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Public()
  async create(@Body(createUserBodyPipeValidator) data: CreateUserBodyDTO) {
    return this.userService.create(data);
  }

  @Get()
  async findOne(@CurrentLoggedUserDecorator() user: TokenPayloadSchema) {
    const { sub } = user;

    return this.userService.findOne(sub);
  }

  @Patch()
  async update(
    @Body(updateUserBodyPipeValidator) data: UpdateUserBodyDTO,
    @CurrentLoggedUserDecorator() user: TokenPayloadSchema,
  ) {
    const { sub } = user;

    return this.userService.update(sub, data);
  }

  @Delete()
  async delete(@CurrentLoggedUserDecorator() user: TokenPayloadSchema) {
    const { sub } = user;

    return this.userService.delete(sub);
  }

  @Post('login')
  @Public()
  async login(@Body(loginUserBodyValidation) body: LoginUserBodyDTO) {
    return this.userService.login(body);
  }
}
