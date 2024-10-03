import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RpcCatchErrorInterceptor implements NestInterceptor {
  // private readonly logger = new Logger('RpcCatchErrorInterceptor');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        throw new RpcException({ ...err });
      }),
    );
  }
}
