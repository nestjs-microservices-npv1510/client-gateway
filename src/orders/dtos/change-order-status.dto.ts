import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { OrderStatus, OrderStatusList } from '../enum';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeOrderStatusDto {
  @ApiProperty({
    name: 'status',
    enum: OrderStatusList,
    description: 'The status of the order',
    example: OrderStatus.PENDING,
    type: String,
  })
  @IsEnum(OrderStatusList, {
    message: 'Order status must be a PENDING, CANCELLED OR COMPLETED',
  })
  status: OrderStatus;
}
