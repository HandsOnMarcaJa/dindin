import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { PrismaModule } from './api/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
})
export class AppModule {  }
