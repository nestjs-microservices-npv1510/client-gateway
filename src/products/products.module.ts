import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ProductsController } from './products.controller';

// envs & constants
import { NatsModule } from 'src/transports/nats.module';
import { CustomClientProxyService } from 'src/common/services/custom-client-proxy.service';

// console.log(typeof config.PRODUCT_MICROSERVICE_PORT);

@Module({
  imports: [NatsModule],
  controllers: [ProductsController],
  providers: [CustomClientProxyService],
})
export class ProductsModule {}
