import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  const Port = process.env.PORT || 3000;

  await app.listen(Port).then(() => {
    console.log(`Server started on port ${Port}`);
  });
}
bootstrap();

