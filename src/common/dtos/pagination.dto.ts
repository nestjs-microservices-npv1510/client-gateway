import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDTO {
  // @ApiProperty({ description: 'Page (number)', example: 2, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  // @ApiProperty({
  //   description: 'The number of products are going to displayed (number)',
  //   example: 5,
  //   required: false,
  // })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number;
}
