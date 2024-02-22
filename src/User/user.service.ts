import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/api/prisma.service';
import { CreateUserBodyDTO } from './DTO/create-user.dto';
import { UpdateUserBodyDTO } from './DTO/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserBodyDTO } from './DTO/login-user-dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) { }

  async create(data: CreateUserBodyDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ForbiddenException('User already exists');
    }

    const hash = await bcrypt.hash(data.password, 8);

    const { password: _, ...user } = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hash,
      },
    });

    return { user };
  }

  async update(id: string, data: UpdateUserBodyDTO) {
    await this.exists(id);
    if (data.password) {
      const hash = await bcrypt.hash(data.password, 8);

      return this.prisma.user.update({
        where: { id },
        data: { ...data, password: hash },
      });
    }

    return this.prisma.user.update({
      where: { id },
      data: data,
    });
  }

  async findOne(id: string) {
    await this.exists(id);

    const { password: _, ...user } = await this.prisma.user.findUnique({
      where: { id },
    });

    return { user };
  }

  async delete(id: string) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  async login({ email, password }: LoginUserBodyDTO) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new ForbiddenException('Email or password is wrong');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Email or password is wrong');
    }

    const result = await this.authService.login(user);

    return result;
  }
}
