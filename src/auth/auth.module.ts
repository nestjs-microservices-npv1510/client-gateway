import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatsModule } from 'src/transports/nats.module';
import { CustomClientProxyService } from 'src/common/services/custom-client-proxy.service';

@Module({
  imports: [NatsModule],
  controllers: [AuthController],
  providers: [CustomClientProxyService],
})
export class AuthModule {}
