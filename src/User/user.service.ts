import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma.service';
import { CreateUserBodyDTO } from './DTO/create-user.dto';
import { UpdateUserBodyDTO, updateUserBody } from './DTO/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUserBodyDTO) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
  }

  async update(id: string, data: UpdateUserBodyDTO){
    await this.exists(id);

    return this.prisma.user.update({
      where: { id },
      data: data,
    })
  }

  async findOne(id: string) {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where:{id}
    })
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
