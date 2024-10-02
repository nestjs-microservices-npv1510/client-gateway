import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto';

export class FindProductByIdSuccessResDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ type: [ProductResponseDto] })
  product: ProductResponseDto;
}

export class FindProductByIdFailedResDto {
  @ApiProperty({ example: 'failed' })
  status: string;

  @ApiProperty({ example: 'Product with id #5 not found' })
  message: string;
}
