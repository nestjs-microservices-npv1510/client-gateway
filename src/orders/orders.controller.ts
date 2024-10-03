// Nestjs
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// dtos
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderPaginationDTO } from 'src/common/dtos/order-pagination.dto';
import { StatusDto } from './dtos/status.dto';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { ChangeOrderStatusDto } from './dtos/change-order-status.dto';
import { CustomClientProxyService } from 'src/common/services/custom-client-proxy.service';
import { CreateOrderResponseDto } from './dtos/swagger-response-dtos/create-order-response.dto';

import { ValidationFailedResponse } from 'src/common/decorators/swagger-api-response-decorators/validation-failed-response.decorator';

import { ValidateOrderProductsFailedResponseDto } from 'src/products/dtos/swagger-response-dtos/validate-products-response.dto';
import { SomeProductsNotValidResponse } from 'src/common/decorators/swagger-api-response-decorators/some-product-not-valid.decorator';

import { PageQuery } from 'src/common/decorators/swagger-api-query-decorators/page-query.decorator';
import { LimitQuery } from 'src/common/decorators/swagger-api-query-decorators/limit-query.decorator';
import { PageExceeds } from 'src/common/decorators/swagger-api-response-decorators/page-exceeds-response.decorator';
import { ValidationFailedResponseDto } from 'src/common/dtos/swagger-response-dtos/validation-failed-response.dto';
import { ApiNotFoundResponse } from 'src/common/decorators/swagger-api-response-decorators/not-found-response.decorator';
import { IdParam } from 'src/common/decorators/swagger-api-params-decorators/id-param.decorator';
import { OrderStatus, OrderStatusList } from './enum';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly natsClientProxy: CustomClientProxyService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    type: CreateOrderResponseDto,
    description: 'Create order successfully',
  })
  @ValidationFailedResponse()
  @SomeProductsNotValidResponse()
  create(@Body() createOrderDto: CreateOrderDto) {
    // console.log('gateway orders create');
    // console.log(createOrderDto);
    // return;
    return this.natsClientProxy.send('orders.create', createOrderDto);
  }

  // Get all orders
  @Get()
  @ApiOperation({ summary: 'Get list of orders with pagination' })
  @PageQuery()
  @LimitQuery()
  @ApiResponse({
    status: 200,
    description: 'List of products',
    // type: FindManyProductsResponseDto,
  })
  @ValidationFailedResponse()
  @PageExceeds()
  async findMany(@Query() orderPaginationDto: OrderPaginationDTO) {
    return this.natsClientProxy.send('orders.findMany', orderPaginationDto);
  }

  @ApiOperation({ summary: 'Get list of orders with pagination by status' })
  @ApiParam({
    name: 'status',
    type: String,
    enum: OrderStatusList,
    description: `Status of the order`,
    example: OrderStatus.PENDING,
  })
  @PageQuery()
  @LimitQuery()
  @ApiResponse({ status: 200, description: 'List of orders' })
  @ValidationFailedResponse()
  @PageExceeds()
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
  @ApiOperation({ summary: 'Get product by id' })
  @IdParam('Order', false, '4d04aa8a-1960-408d-aa67-36ed4d483795')
  @ApiResponse({
    status: 200,
    description: 'Order found',
    // type: StatusProductResponseDto,
  })
  @ValidationFailedResponse()
  @ApiNotFoundResponse('Order')
  findOrderById(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: (errors) =>
          new UnprocessableEntityException({
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: 'Order ID is not valid',
          }),
      }),
    )
    id: string,
  ) {
    return this.natsClientProxy.send('orders.findOrderById', { id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update status of order by ID' })
  @IdParam('Order', false, '4d04aa8a-1960-408d-aa67-36ed4d483795')
  @ApiBody({
    type: ChangeOrderStatusDto,
    description: 'Status of the order ',
    enum: OrderStatusList,
  })
  @ApiResponse({
    status: 200,
    description: 'Order informatiom have been updated',
  })
  @ValidationFailedResponse()
  @ApiNotFoundResponse('Order')
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
