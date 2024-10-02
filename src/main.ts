// Nestjs
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

// module
import { AppModule } from './app.module';

// common / utils
import { CustomRpcExceptionFilter } from './common';

// env
import * as envVars from './config';
import { CustomHttpExceptionFilter } from './common/filters/http-custom-exception.filter';
import { RpcCatchErrorInterceptor } from './common/interceptors/rpcCatchError.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(
    new CustomRpcExceptionFilter(),
    new CustomHttpExceptionFilter(),
  );

  app.useGlobalInterceptors(
    new RpcCatchErrorInterceptor(),
    new LoggingInterceptor(),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJs Microservices - Shop API')
    .setDescription('This is Shop API description')
    .setVersion('1.0')
    .addTag('shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(envVars.PORT, () => {
    logger.log(`Gateway is running on port ${envVars.PORT}`);
  });
}
bootstrap();
