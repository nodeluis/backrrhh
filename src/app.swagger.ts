import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  /*
  *configuracion del swagger
  */
  const config = new DocumentBuilder()
    .setTitle('API de rrhh')
    .setDescription('API de recursos humanos')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('RRHH')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('rrhh', app, document);
};
