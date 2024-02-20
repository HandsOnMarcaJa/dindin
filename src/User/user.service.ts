import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma.service';
import { CreateUserDTO } from './DTO/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data,
    });
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
    if (
      !(await this.prisma.user.findFirst({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('User not found');
    }
  }
}
