import { PartialType } from '@nestjs/mapped-types';
import { PaginationDTO } from './pagination.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from 'src/orders/enum';

export class OrderPaginationDTO extends PaginationDTO {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: 'Order status must be PENDING, CANCELLED or COMPLETED',
  })
  status: OrderStatus;
}
