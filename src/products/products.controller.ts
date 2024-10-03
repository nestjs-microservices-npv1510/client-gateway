// NestJs
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';

// dtos
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

// utils
import { CustomClientProxyService } from 'src/common/services/custom-client-proxy.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Swagger response dtos

import { FindManyProductsResponseDto } from './dtos/swagger-response-dtos/find-many-product-response.dto';
import { StatusProductResponseDto } from './dtos/swagger-response-dtos/status-product-response.dto';
import { PaginationExceedResponseDto } from 'src/common/dtos/swagger-response-dtos/pagination-response.dto';
import { ValidationFailedResponseDto } from 'src/common/dtos/swagger-response-dtos/validation-failed-response.dto';
import {
  ValidateOrderProductsFailedResponseDto,
  ValidateOrderProductsSuccessResponseDto,
} from './dtos/swagger-response-dtos/validate-products-response.dto';

import { ValidateOrderProductsRequestDto } from './dtos/swagger-request-dtos/validate-order-products-request.dto';

import { ValidationFailedResponse } from 'src/common/decorators/swagger-api-response-decorators/validation-failed-response.decorator';

import { ApiNotFoundResponse } from 'src/common/decorators/swagger-api-response-decorators/not-found-response.decorator';
import { ApiDuplicateResponse } from 'src/common/decorators/swagger-api-response-decorators/duplicate-response.decorator';
import { SomeProductsNotValidResponse } from 'src/common/decorators/swagger-api-response-decorators/some-product-not-valid.decorator';

import { PageQuery } from 'src/common/decorators/swagger-api-query-decorators/page-query.decorator';
import { LimitQuery } from 'src/common/decorators/swagger-api-query-decorators/limit-query.decorator';
import { PageExceeds } from 'src/common/decorators/swagger-api-response-decorators/page-exceeds-response.decorator';
import { IdParam } from 'src/common/decorators/swagger-api-params-decorators/id-param.decorator';

// import { CreateDto } from './dtos/swagger-dtos/create.dto';

// envs
// import * as config from '../config';
// import { catchError } from 'rxjs';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly natsClientProxy: CustomClientProxyService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: StatusProductResponseDto,
  })
  @ValidationFailedResponse()
  @ApiDuplicateResponse('Product')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.natsClientProxy.send('product.create', createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of products with pagination' })
  @PageQuery()
  @LimitQuery()
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: FindManyProductsResponseDto,
  })
  @ValidationFailedResponse()
  @PageExceeds()
  findMany(@Query() paginationDto: PaginationDTO) {
    return this.natsClientProxy.send('products.findMany', paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  @IdParam('Product', true, 5)
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: StatusProductResponseDto,
  })
  @ValidationFailedResponse()
  @ApiNotFoundResponse('Product')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.natsClientProxy.send('products.findById', { id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product by id' })
  @IdParam('Product', true, 5)
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully updated',
    type: StatusProductResponseDto,
  })
  @ValidationFailedResponse()
  @ApiNotFoundResponse('Product')
  @ApiDuplicateResponse('Product')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    console.log('products controller update');
    return this.natsClientProxy.send('products.update', {
      id,
      ...updateProductDto,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete product by id' })
  @IdParam('Product', true, 5)
  @ApiResponse({
    status: 204,
    description: 'Product deleted successfully',
  })
  @ValidationFailedResponse()
  @ApiNotFoundResponse('Product')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.natsClientProxy.send('products.delete', { id });
  }

  @Post('validate')
  @HttpCode(200)
  @ApiOperation({ summary: 'Validate product listing before ordering' })
  @ApiBody({ type: ValidateOrderProductsRequestDto })
  @ApiResponse({
    status: 200,
    description: 'All products are valid',
    type: ValidateOrderProductsSuccessResponseDto,
  })
  @SomeProductsNotValidResponse()
  @ValidationFailedResponse()
  validateOrderProducts(
    @Body(
      'productIds',
      new ParseArrayPipe({
        items: Number,
        exceptionFactory: (errors) =>
          new UnprocessableEntityException({
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: 'Product Ids are not valid',
          }),
      }),
    )
    productIds: number[],
  ) {
    return this.natsClientProxy.send('products.validate-order-products', {
      productIds,
    });
  }
}
