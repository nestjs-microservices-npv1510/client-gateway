import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Smartphone',
    name: 'name',
    required: true,
    description: 'Name of the product ',
  })
  @IsString()
  public name: string;

  @ApiProperty({
    example: 1099.99,
    name: 'price',
    required: true,
    description: 'Price of the product',
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price is a number with max 2 decimal digits' },
  )
  @IsPositive()
  @Type(() => Number)
  public price: number;

  @ApiProperty({
    example: 'Best seller smart phone in the world',
    name: 'description',
    required: false,
    description: 'Description of the product',
  })
  @IsString()
  @IsOptional()
  public description: string;
}
