import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';
import { CustomClientProxyService } from './common/services/custom-client-proxy.service';

@Module({
  imports: [ProductsModule, OrdersModule, NatsModule, AuthModule],
  controllers: [],
})
export class AppModule {}
