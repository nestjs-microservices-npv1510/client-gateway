import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DuplicateResponseDto } from 'src/common/dtos/swagger-response-dtos/duplicate-response.dto';

export function ApiDuplicateResponse(resource: string) {
  return ApiResponse({
    status: HttpStatus.CONFLICT,
    description: `${resource} is duplicated`,
    type: DuplicateResponseDto,
  });
}
