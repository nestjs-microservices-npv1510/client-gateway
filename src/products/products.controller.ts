import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Redirect,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

// dtos
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// envs
import * as config from '../config';

// utils
import { catchError, firstValueFrom, Observable, of } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(config.NATS_SERVICE_NAME)
    private readonly natsClientProxy: ClientProxy,
  ) {}

  // @Get('observable')
  // getObservable(): Observable<any> {
  //   return of(['a', 'b', 'c', 'd', 'e', 'f']);
  // }

  @Get('test-throw-exception')
  testThrowException(@Body() reqBody: any) {
    const { message, status } = reqBody;

    // throw new HttpException(message, +status);
    // throw new UnauthorizedException(message);
    // throw new NotFoundException(message);
  }

  @Get('test-throw-exception-from-service')
  async testThrowExceptionFromService(
    @Body('message') message: string,
    @Body('status') status: number,
  ) {
    try {
      return await firstValueFrom(
        this.natsClientProxy.send('test.throw.exception.from.service', {
          message,
          status,
        }),
      );
    } catch (err) {
      console.log('ERROR FROM SERVICE:');
      // return err;
      throw new RpcException(err);
    }
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.natsClientProxy.send('create_product', createProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  // @Redirect('https://docs.nestjs.com/recipes/prisma#set-up-prisma', 301)
  findAll(@Query() paginationDto: PaginationDTO) {
    return this.natsClientProxy.send('find_products', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.natsClientProxy.send('find_a_product', { id }).pipe(
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
    return this.natsClientProxy
      .send('update_product', { id, ...updateProductDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.natsClientProxy.send('delete_product', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('validate')
  validateProducts(@Body('products', ParseArrayPipe) productIds: number[]) {
    return this.natsClientProxy.send('validate_products', productIds).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
