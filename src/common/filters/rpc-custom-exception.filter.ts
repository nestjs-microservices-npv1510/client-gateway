// NestJs
import {
  Catch,
  ArgumentsHost,
  RpcExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { isInstance } from 'class-validator';
import { object } from 'joi';

// others
import { Observable } from 'rxjs';

@Catch(RpcException)
export class CustomRpcExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  private readonly logger = new Logger('RpcExceptionFilter');

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const context = host.switchToHttp();
    const res = context.getResponse();

    // Lấy errorDetails
    const errorDetails = exception.getError() as any;
    // return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errorDetails });

    // LOGGING
    this.logger.error(
      `Error name: ${errorDetails.name || 'Unknown error type'}`,
    );
    this.logger.error(`Error: ${JSON.stringify(errorDetails)}`);

    // errDetails là Object
    if (typeof errorDetails === 'object') {
      const errorCode = errorDetails.code;

      // response information
      let { statusCode, message, ...othersData } = errorDetails;
      statusCode ||= HttpStatus.INTERNAL_SERVER_ERROR;
      message ||= 'Something went wrong';
      let status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';

      // Validation pipe exception
      if (errorDetails.name === 'BadRequestException') {
        statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
        status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';

        const messages = errorDetails.response.message;
        return res.status(statusCode).json({ status, message: messages });
      }

      // PrismaClientValidationError && code = P2002
      if (errorCode === 'P2002') {
        const meta = errorDetails.meta; // Nếu có metadata chứa chi tiết hơn
        const { modelName: resource, target: uniqueField } = meta;

        statusCode = HttpStatus.CONFLICT;
        status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
        message = `${resource} ${uniqueField} is duplicated`;

        return res.status(statusCode).json({ status, message });
      }

      // Error from parse pipe (with details)
      if (errorDetails.response) statusCode = errorDetails.response.statusCode;
      // Error not from parse pipe (with my details)
      else {
        if (othersData)
          return res
            .status(statusCode)
            .json({ status, message, ...othersData });
      }

      return res.status(statusCode).json({ status, message });
    }

    // errorDetails là string
    else {
      this.logger.error('String RpcError: ', errorDetails);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: errorDetails });
    }
  }
}
