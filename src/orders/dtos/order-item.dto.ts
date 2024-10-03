import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class OrderItemDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'ID of the product',
    example: 5,
  })
  @IsPositive()
  productId: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Price of the product',
    example: 1000.99,
  })
  @IsPositive()
  price: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'QTY',
    example: 999,
  })
  @IsPositive()
  @IsOptional()
  quantity: number = 1;
}
