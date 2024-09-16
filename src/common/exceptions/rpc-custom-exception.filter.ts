import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  RpcExceptionFilter,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class CustomRpcExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log('GLOBAL FILTER');

    const context = host.switchToHttp();
    const res = context.getResponse();
    const req = context.getResponse();

    const { status, message } = Object(exception.getError());

    if (status && message)
      return res.status(status).json({ status: status, message });

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: status, message: 'Something went wrong ' });
  }
}
