import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { catchError } from 'rxjs';

// interfaces
import { IRequestUser } from './interfaces/request-user.interface';

// dtos
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

// guards
import { AuthGuard } from './guards/auth.guard';

// decorators
import { User, Token } from './decorators';

// envs
import * as config from '../config';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(config.NATS_SERVICE_NAME) private natsClient: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.natsClient.send('auth.register.user', registerDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.natsClient.send('auth.register.login', loginDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify-token')
  verifyToken(@User() user: IRequestUser, @Token() token: string) {
    // TODO: Verify token using JWT and return user info

    return { user, token };
    // return this.natsClient.send('auth.register.verify-token', {});
  }
}
