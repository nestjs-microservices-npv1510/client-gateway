import { ApiQuery } from '@nestjs/swagger';

export function PageQuery() {
  return ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
    example: 2,
  });
}
