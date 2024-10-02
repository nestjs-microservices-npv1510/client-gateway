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
import { CustomClientProxyService } from 'src/common/services/custom-client-proxy.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly natsClient: CustomClientProxyService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    // return registerDto;
    return this.natsClient.send('auth.register.user', registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    // return loginDto;

    return this.natsClient.send('auth.register.login', loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('verify-token')
  verifyToken(@User() user: IRequestUser, @Token() token: string) {
    // TODO: Verify token using JWT and return user info
    // console.log('gateway auth controller verify token');
    // return { user, token };
    return this.natsClient.send('auth.register.verify-token', {});
  }
}
