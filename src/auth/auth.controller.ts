import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import * as config from '../config';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(config.NATS_SERVICE_NAME) private natsClient: ClientProxy,
  ) {}

  @Post('register')
  register() {
    console.log('register');
    return this.natsClient.send('register', {});
  }

  @Post('login')
  login() {
    return this.natsClient.send('login', {});
  }
}
