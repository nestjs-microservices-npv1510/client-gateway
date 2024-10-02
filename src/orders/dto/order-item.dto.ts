import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class OrderItemDto {
  @IsPositive()
  productId: number;

  @IsPositive()
  price: number;

  @IsPositive()
  @IsOptional()
  quantity: number = 1;
}
