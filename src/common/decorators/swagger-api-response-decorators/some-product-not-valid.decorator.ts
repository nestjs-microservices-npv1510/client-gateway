import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ValidateOrderProductsFailedResponseDto } from 'src/products/dtos/swagger-response-dtos/validate-products-response.dto';

export function SomeProductsNotValidResponse() {
  return ApiResponse({
    status: HttpStatus.BAD_REQUEST, // Bạn có thể sử dụng 400 cho lỗi validation
    description: '!',
    type: ValidateOrderProductsFailedResponseDto,
  });
}
