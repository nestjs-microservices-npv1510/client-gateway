import { ApiProperty } from '@nestjs/swagger';

export class DuplicateResponseDto {
  @ApiProperty({ example: 'failed' })
  status: string;

  @ApiProperty({
    example: `ABCXYZ is duplicated`,
  })
  message: string;
}
