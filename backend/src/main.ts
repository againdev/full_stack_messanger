import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://127.0.0.1:3001', 'http://localhost:3001'],
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
  });
  app.use(graphqlUploadExpress({ maxFieldSize: 10000000, maxFiles: 1 }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
