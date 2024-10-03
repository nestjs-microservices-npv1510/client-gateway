import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto';

export class FindProductByIdSuccessResDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ type: [ProductResponseDto] })
  product: ProductResponseDto;
}
