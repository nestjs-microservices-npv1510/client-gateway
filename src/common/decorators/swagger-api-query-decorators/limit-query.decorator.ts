import { ApiQuery } from '@nestjs/swagger';

export function LimitQuery() {
  return ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of products per page',
    example: 5,
  });
}
