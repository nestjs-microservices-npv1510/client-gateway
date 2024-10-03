import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationExceedResponseDto } from 'src/common/dtos/swagger-response-dtos/pagination-response.dto';

export function PageExceeds() {
  return ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Page exceeds total pages',
    type: PaginationExceedResponseDto,
  });
}
