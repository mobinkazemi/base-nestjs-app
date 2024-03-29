import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import configuration from 'config/configuration';
import { ResponseFormatterInterceptor } from './common/interceptors/response-formatter.interceptor';

async function bootstrap() {
  // Get application configs
  const applicationConfigs = configuration();
  //
  //
  //
  // Creating Nestjs application + Initial Configs
  const app = await NestFactory.create(AppModule, {});
  app.setGlobalPrefix('api/v1');

  //
  //
  //
  // Interceptors
  const interceptors = [new ResponseFormatterInterceptor()];

  app.useGlobalInterceptors(...interceptors);
  //
  //
  //
  // Pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //
  //
  //
  // CORS
  const corsOptions = {
    origin: applicationConfigs.client.uri, // Replace with the URL of your React app
    methods: applicationConfigs.client.methods,
    credentials: false,
  };
  app.enableCors(corsOptions);

  //
  //
  //
  // SWAGGER
  const swaggerConfig = new DocumentBuilder()
    .setTitle(applicationConfigs.appName)
    .setVersion('1.0')
    .addServer(`http://localhost:${applicationConfigs.port}`)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  //
  //
  //
  // RUNNING APPLICATION
  const PORT = applicationConfigs.port;
  await app.listen(PORT, () => {
    const { minio, redis, database } = applicationConfigs;
    console.log(`✅ Environment is: ${process.env.NODE_ENV}`);
    console.log(`✅ App is running on port ${PORT}`);
    // console.log(
    //   `👀 Expecting Minio on ${minio.host}:${minio.port}/${minio.bucket}`,
    // );
    // console.log(
    //   `👀 Expecting Redis on ${redis.host}:${redis.port}/${redis.name}`,
    // );
    console.log(`👀 Expecting Mongo on ${database.uri.split('//')[1]}`);
  });
}
bootstrap();
