// NestJs
import { Module } from '@nestjs/common';

// controllers
import { OrdersController } from './orders.controller';

// envs
import * as config from 'src/config';

// modules
import { NatsModule } from 'src/transports/nats.module';

// utils
import { CustomClientProxyService } from 'src/common/services/custom-client-proxy.service';

@Module({
  imports: [NatsModule],
  controllers: [OrdersController],
  providers: [CustomClientProxyService],
})
export class OrdersModule {}
