import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    // console.log('⚠️⚠️ FROM GLOBAL HTTP FILTER');

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const errorDetails = exception.getResponse() as any;

    // LOGGING
    this.logger.error(JSON.stringify(errorDetails));
    // console.log(errorDetails);

    const statusCode =
      errorDetails.statusCode ||
      exception.getStatus() ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    const message = errorDetails.message || 'Something went wrong';
    const status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';

    return res.status(statusCode).json({ status, message });
  }
}
