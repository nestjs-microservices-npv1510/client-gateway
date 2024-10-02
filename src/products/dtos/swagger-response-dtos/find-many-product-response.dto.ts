import { ApiProperty } from '@nestjs/swagger';

class MetaDataDto {
  @ApiProperty({ example: 5 })
  page: number;

  @ApiProperty({ example: 24 })
  totalPages: number;

  @ApiProperty({ example: 47 })
  totalItems: number;
}

class ProductDto {
  @ApiProperty({ example: 9 })
  id: number;

  @ApiProperty({ example: 'SmartPhone' })
  name: string;

  @ApiProperty({ example: 1099.99 })
  price: number;

  @ApiProperty({ example: true })
  available: boolean;

  @ApiProperty({ example: '2024-02-27T15:51:13.021Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-02-27T15:51:13.021Z' })
  updatedAt: string;
}

export class FindManyProductsResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ type: MetaDataDto })
  metaData: MetaDataDto;

  @ApiProperty({ type: [ProductDto] })
  products: ProductDto[];
}
