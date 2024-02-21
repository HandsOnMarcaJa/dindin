import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { PrismaModule } from 'src/api/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ValidateIdMiddleware } from 'src/validate-id/validate-id.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateIdMiddleware)
      .exclude({ path: 'user', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
