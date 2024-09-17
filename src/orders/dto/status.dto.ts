import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum';

export class StatusDto {
  @IsString()
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: 'Order status must be PENDING, CANCELLED OR COMPLETED',
  })
  status: OrderStatus;
}
