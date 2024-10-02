import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ example: 9 })
  id: number;

  @ApiProperty({ example: 'SmartPhone' })
  name: string;

  @ApiProperty({ example: 1099.99 })
  price: number;

  @ApiProperty({ example: 'Best seller smartphone in the world' })
  description: string;

  @ApiProperty({ example: true })
  available: boolean;

  @ApiProperty({ example: '2024-02-27T15:51:13.021Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-02-27T15:51:13.021Z' })
  updatedAt: string;
}
