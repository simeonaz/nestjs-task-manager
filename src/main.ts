import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Tasks manager API')
    .setDescription('Documentation for the Task Manager API')
    .setVersion('1.0')
    .addTag('Tasks manager V1')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());

  const port = configService.get<number>('PORT') ?? 3000;
  // console.log(`Application is running on: http://localhost:${port}/api`);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
