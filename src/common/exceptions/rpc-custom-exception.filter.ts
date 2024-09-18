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
import { isNumber } from 'class-validator';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class CustomRpcExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const context = host.switchToHttp();
    const res = context.getResponse();
    const req = context.getResponse();

    const rpcError = Object(exception.getError());
    console.log('⚠️⚠️ FROM GLOBAL FILTER');
    // console.log(typeof rpcError);
    console.log(rpcError);

    if (rpcError?.message.includes('Empty response'))
      return res.status(500).json({ status: 500, message: rpcError.message });

    if (rpcError?.status)
      return res
        .status(500)
        .json({ status: rpcError.status, message: rpcError.message });

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 500, message: 'Something went wrong' });
  }
}
