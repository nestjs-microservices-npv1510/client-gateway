import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';

import * as config from '../config';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(config.ORDER_MICROSERVICE_NAME)
    private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersClient.send({ cmd: 'find_all_orders' }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send({ cmd: 'find_an_order' }, {});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersClient.send({ cmd: '' }, {});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersClient.send({ cmd: '' }, {});
  }
}
