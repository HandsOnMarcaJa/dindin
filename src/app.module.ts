import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { PrismaModule } from './api/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
