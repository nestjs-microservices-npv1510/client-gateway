import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto';

export class ValidateOrderProductsSuccessResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ type: [ProductResponseDto] })
  products: ProductResponseDto[];
}

export class ValidateOrderProductsFailedResponseDto {
  @ApiProperty({ example: 'failed' })
  status: string;

  @ApiProperty({ type: String, example: 'Some products is not valid !' })
  message: string;
}
