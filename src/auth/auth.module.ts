import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatsModule } from 'src/transports/nats.module';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    NatsModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
