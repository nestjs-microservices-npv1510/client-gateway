import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';

import { RpcException } from '@nestjs/microservices';

import * as config from '../config';
import { catchError, firstValueFrom } from 'rxjs';
import { OrderPaginationDTO } from 'src/common/dtos/order-pagination.dto';
import { StatusDto } from './dto/status.dto';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { CustomClientProxyService } from 'src/common/services/custom-client-proxy.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly natsClientProxy: CustomClientProxyService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    // console.log('gateway orders create');
    // console.log(createOrderDto);
    // return;
    return this.natsClientProxy.send('orders.create', createOrderDto);
  }

  // Get all orders
  @Get()
  async findMany(@Query() orderPaginationDto: OrderPaginationDTO) {
    return this.natsClientProxy.send('orders.findMany', orderPaginationDto);
  }

  // Get all orders (alternative) by status
  @Get(':status')
  findManyOrderByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDTO,
  ) {
    return this.natsClientProxy.send('orders.findMany', {
      ...statusDto,
      ...paginationDto,
    });
  }

  @Get('id/:id')
  findOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.natsClientProxy.send('orders.findOrderById', { id });
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id') id: number,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
  ) {
    // return { id, ...changeOrderStatusDto };
    return this.natsClientProxy.send('orders.changeOrderStatus', {
      id,
      ...changeOrderStatusDto,
    });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.natsClientProxy.send({ cmd: '' }, {});
  // }
}
