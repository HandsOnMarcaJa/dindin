import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/api/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
