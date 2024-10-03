import { ApiProperty } from '@nestjs/swagger';

export class PaginationExceedResponseDto {
  @ApiProperty({ example: 'failed' })
  status: string;

  @ApiProperty({
    example: 'Page exceeds total pages',
  })
  message: string;

  @ApiProperty({ example: 51 })
  page: number;

  @ApiProperty({ example: 50 })
  totalPages: number;
}
