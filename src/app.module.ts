import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, OrdersModule, NatsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
