import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { NATS_SERVICE_NAME, PRODUCT_MICROSERVICE_NAME } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { ProductsService } from './products.service';

import * as config from '../config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE_NAME)
    private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    // console.log(createProductDto);
    return this.productsClient
      .send({ cmd: 'create_product' }, createProductDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDTO) {
    // console.log(paginationDto);
    return this.productsClient
      .send({ cmd: 'find_all_products' }, paginationDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, { id }),
    //   );

    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }

    return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    // return this.productService.delete();
    return this.productsClient.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('validate')
  validateProducts(@Body('products', ParseArrayPipe) productIds: number[]) {
    // return productIds;
    return this.productsClient
      .send({ cmd: 'validate_products' }, productIds)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
