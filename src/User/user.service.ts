import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma.service';
import { CreateUserBodyDTO } from './DTO/create-user.dto';
import { UpdateUserBodyDTO, updateUserBody } from './DTO/update-user.dto';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUserBodyDTO) {

    const hash = await bcrypt.hash(data.password, 8); 

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hash,
      },
    });
  }

  async update(id: string, data: UpdateUserBodyDTO){
    await this.exists(id);
    await this.validateId(id);

    if (data.password) {
      const hash = await bcrypt.hash(data.password, 8);

      return this.prisma.user.update({
        where: { id },
        data: {...data, password: hash}
      })
    }

    return this.prisma.user.update({
      where: { id },
      data: data
    })
  }

  async findOne(id: string) {
    await this.exists(id);
    await this.validateId(id);

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

  async validateId(id: string) {

    const HexString12BytesSchema = z.string().refine(value => /^[0-9a-fA-F]{24}$/.test(value));
    
    if (!HexString12BytesSchema.safeParse(id)) {
      throw new Error('Invalid ID');
    }
  }

}
