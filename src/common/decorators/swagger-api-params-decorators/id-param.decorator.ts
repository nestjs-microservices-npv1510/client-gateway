import { ApiParam } from '@nestjs/swagger';

export function IdParam(
  resource: string,
  typeIsNumber: boolean,
  example: string | number,
) {
  return ApiParam({
    name: 'id',
    type: typeIsNumber ? Number : String,
    description: `ID of the ${resource}`,
    example,
  });
}
