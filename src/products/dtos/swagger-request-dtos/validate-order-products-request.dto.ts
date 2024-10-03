import { ApiProperty } from '@nestjs/swagger';

export class ValidateOrderProductsRequestDto {
  @ApiProperty({
    type: [Number],
    example: [1, 3, 5, 12],
    description: "description: 'List of product IDs to be validated' ",
  })
  productIds: number[];
}
