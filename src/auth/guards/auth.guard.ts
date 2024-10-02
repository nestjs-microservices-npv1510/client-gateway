import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

// envs
import * as config from '../../config';

// 3rd
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, first, firstValueFrom } from 'rxjs';
import { CustomClientProxyService } from 'src/common/services/custom-client-proxy.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger('AuthenticationGuard');

  constructor(private readonly natsClient: CustomClientProxyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found. Please login again.');
    }

    try {
      const { id, iat, exp } = await firstValueFrom(
        this.natsClient.send('auth.register.verify-token', { token }),
      );

      // console.log('AuthGuard canActivate');
      // console.log(id);

      const foundUser = await firstValueFrom(
        this.natsClient.send('auth.findUserById', { id }),
      );

      request.user = foundUser;
      request.token = token;
      return true;
    } catch (err) {
      // console.log('🛡️🛡️ ERROR AT AUTH GUARD: ', err.name, err.message);

      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')
        throw new UnauthorizedException(err.message);

      throw new HttpException(err, 500);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
