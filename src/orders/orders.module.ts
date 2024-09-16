import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as config from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: config.ORDER_MICROSERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: config.ORDER_MICROSERVICE_HOST,
          port: config.ORDER_MICROSERVICE_PORT,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
