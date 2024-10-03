import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto';

class MetaDataDto {
  @ApiProperty({ example: 5 })
  page: number;

  @ApiProperty({ example: 24 })
  totalPages: number;

  @ApiProperty({ example: 47 })
  totalItems: number;
}

export class FindManyProductsResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ type: MetaDataDto })
  metaData: MetaDataDto;

  @ApiProperty({ type: [ProductResponseDto] })
  products: ProductResponseDto[];
}
