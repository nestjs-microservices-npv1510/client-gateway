import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto';

export class CreateProductResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ type: ProductResponseDto })
  products: ProductResponseDto;
}
