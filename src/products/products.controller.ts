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

// dtos
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

// utils
import { CustomClientProxyService } from 'src/common/services/custom-client-proxy.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindManyProductsResponseDto } from './dtos/swagger-response-dtos/find-many-product-response.dto';
import { CreateProductResponseDto } from './dtos/swagger-response-dtos/create-product-response.dto';
import { number } from 'joi';
import {
  FindProductByIdFailedResDto,
  FindProductByIdSuccessResDto,
} from './dtos/swagger-response-dtos/find-product-by-id-response.dto';
// import { CreateDto } from './dtos/swagger-dtos/create.dto';

// envs
// import * as config from '../config';
// import { catchError } from 'rxjs';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly natsClientProxy: CustomClientProxyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: CreateProductResponseDto,
  })
  @HttpCode(201)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.natsClientProxy.send('product.create', createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of products with pagination' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
    example: 2,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of products per page',
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: FindManyProductsResponseDto,
  })
  findMany(@Query() paginationDto: PaginationDTO) {
    return this.natsClientProxy.send('products.findMany', paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the product',
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: FindProductByIdSuccessResDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    type: FindProductByIdFailedResDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.natsClientProxy.send('products.findById', { id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product by id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the product',
    example: 5,
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
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
  @ApiOperation({ summary: 'Delete product by id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the product',
    example: 5,
  })
  @ApiResponse({
    status: 204,
    description: 'Product deleted successfully',
  })
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
