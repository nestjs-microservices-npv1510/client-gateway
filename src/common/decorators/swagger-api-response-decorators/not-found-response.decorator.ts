import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { NotFoundResponseDto } from 'src/common/dtos/swagger-response-dtos/not-found-response.dto';

export function ApiNotFoundResponse(resource: string) {
  return ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: `${resource} not found`,
    type: NotFoundResponseDto,
  });
}
