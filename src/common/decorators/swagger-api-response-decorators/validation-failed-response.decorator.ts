import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ValidationFailedResponseDto } from 'src/common/dtos/swagger-response-dtos/validation-failed-response.dto';

export function ValidationFailedResponse() {
  return ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Validation failed',
    type: ValidationFailedResponseDto,
  });
}
