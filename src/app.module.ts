import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { PrismaModule } from './api/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidateIdMiddleware } from './validate-id/validate-id.middleware';
import { UserController } from './User/user.controller';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateIdMiddleware)
      .exclude({path: 'users', method: RequestMethod.POST})
      .forRoutes(UserController);
  }
}
