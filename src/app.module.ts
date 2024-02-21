import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { PrismaModule } from './api/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
