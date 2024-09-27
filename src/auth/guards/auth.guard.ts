import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

// envs
import * as config from '../../config';

// 3rd
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, first, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(config.NATS_SERVICE_NAME) private natsClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found. Please login again.');
    }

    try {
      const { id, iat, exp } = await firstValueFrom(
        this.natsClient.send('auth.register.verify-token', token),
      );

      const foundUser = await firstValueFrom(
        this.natsClient.send('auth.findUser.byId', id),
      );

      request.user = foundUser;
      request.token = token;
    } catch (err) {
      console.log('🛡️🛡️ ERROR AT AUTH GUARD');
      throw new UnauthorizedException(err);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
