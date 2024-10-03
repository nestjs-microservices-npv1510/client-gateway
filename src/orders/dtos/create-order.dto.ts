import { OrderStatus } from '../enum';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { OrderItemDto } from './order-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // Validate mỗi phần tử trong mảng
  @Type(() => OrderItemDto) // Chuyển đổi mỗi phần tử sang instance của OrderItemDto
  @ApiProperty({
    type: [OrderItemDto],
    example: [
      {
        productId: 12,
        price: 0.99,
        quantity: 3,
      },
      {
        productId: 33,
        price: 0.99,
        quantity: 2,
      },
      {
        productId: 29,
        price: 0.99,
      },
    ],
  })
  items: OrderItemDto[];
}
