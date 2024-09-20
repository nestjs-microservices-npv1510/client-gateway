import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ProductsController } from './products.controller';

// envs & constants
import * as config from '../config';
import { NatsModule } from 'src/transports/nats.module';

// console.log(typeof config.PRODUCT_MICROSERVICE_PORT);

@Module({
  imports: [NatsModule],
  controllers: [ProductsController],
})
export class ProductsModule {}
