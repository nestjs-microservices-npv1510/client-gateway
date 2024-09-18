import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

// envs & constants
import * as config from '../config';
import { NatsModule } from 'src/transports/nats.module';

// console.log(typeof config.PRODUCT_MICROSERVICE_PORT);

@Module({
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: config.PRODUCT_MICROSERVICE_NAME,
  //       transport: Transport.TCP,
  //       options: {
  //         host: config.PRODUCT_MICROSERVICE_HOST,
  //         port: config.PRODUCT_MICROSERVICE_PORT,
  //       },
  //     },
  //   ]),
  // ],
  imports: [NatsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
