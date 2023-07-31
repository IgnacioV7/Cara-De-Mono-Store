import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { createWriteStream } from 'fs';
import { get } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions:{
        enableImplicitConversion: true
      }
    })
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('CARA DE MONO STORE')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);


  app.enableCors();

  await app.listen(process.env.PORT || 3000);

  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'stag' || process.env.NODE_ENV === 'prod') {

    // write swagger ui files
    get(`http://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    });

    get(`http://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
      );
    });

    get(`http://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js`, function (response) {
      response.pipe(
        createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
      );
      console.log(
        `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
      );
    });

    get(`http://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
      );
    });
  }

}
bootstrap();
