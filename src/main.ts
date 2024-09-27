import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import * as envVars from './config';
import { CustomRpcExceptionFilter } from './common';

// console.log('FROM MAIN: ');
// console.log(envVars.PORT);

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  // console.log('HOT RELOADING...')
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new CustomRpcExceptionFilter());

  await app.listen(envVars.PORT, () => {
    logger.log(`Gateway is running on port ${envVars.PORT}`);
  });
}
bootstrap();
