import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  *configuracion del swagger
  */
  const config = new DocumentBuilder()
    .setTitle('API de rrhh')
    .setDescription('API de recursos humanos')
    .setVersion('1.0')
    .addTag('RRHH')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('rrhh', app, document);
  app.enableCors();

  /*
  *configuracion de los validadores
  **/
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
