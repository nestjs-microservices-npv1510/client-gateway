import { OrderStatus } from '../enum';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // Validate mỗi phần tử trong mảng
  @Type(() => OrderItemDto) // Chuyển đổi mỗi phần tử sang instance của OrderItemDto
  items: OrderItemDto[];
}
