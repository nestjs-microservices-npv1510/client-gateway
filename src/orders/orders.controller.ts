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
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { ClientProxy, RpcException } from '@nestjs/microservices';

import * as config from '../config';
import { catchError, firstValueFrom } from 'rxjs';
import { OrderPaginationDTO } from 'src/common/dto/order-pagination.dto';
import { StatusDto } from './dto/status.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { isInstance } from 'class-validator';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(config.NATS_SERVICE_NAME)
    private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'create_order' }, createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // Get all orders
  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDTO) {
    return this.ordersClient
      .send({ cmd: 'find_all_orders' }, orderPaginationDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  // Get all orders (alternative) by status
  @Get(':status')
  findAllOrdersByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDTO,
  ) {
    return this.ordersClient
      .send({ cmd: 'find_all_orders' }, { ...statusDto, ...paginationDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersClient.send({ cmd: 'find_an_order' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id') id: number,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
  ) {
    // return { id, ...changeOrderStatusDto };
    return this.ordersClient
      .send({ cmd: 'change_order_status' }, { id, ...changeOrderStatusDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersClient.send({ cmd: '' }, {});
  }
}
