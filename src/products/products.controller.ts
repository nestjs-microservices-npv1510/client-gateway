// NestJs
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

// dtos
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// utils
import { CustomClientProxyService } from 'src/common/services/custom-client-proxy.service';

// envs
import * as config from '../config';
import { catchError } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(private readonly natsClientProxy: CustomClientProxyService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.natsClientProxy.send('product.create', createProductDto);
  }

  @Get()
  // @Redirect('https://docs.nestjs.com/recipes/prisma#set-up-prisma', 301)
  findAll(@Query() paginationDto: PaginationDTO) {
    return this.natsClientProxy.send('products.findMany', paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.natsClientProxy.send('products.findById', { id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.natsClientProxy.send('products.update', {
      id,
      ...updateProductDto,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.natsClientProxy.send('products.delete', { id });
  }

  @Post('validate')
  validateOrderProducts(
    @Body('products', ParseArrayPipe) productIds: number[],
  ) {
    return this.natsClientProxy.send(
      'products.validate-order-products',
      productIds,
    );
  }
}
