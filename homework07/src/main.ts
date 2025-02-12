import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const PORT = process.env.APP_PORT || 3000;
    const PREFIX = 'api';

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    app.setGlobalPrefix(PREFIX);

    await app.listen(PORT, () => {
      console.log(`Server started: http://localhost:${PORT}/${PREFIX}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

bootstrap();
