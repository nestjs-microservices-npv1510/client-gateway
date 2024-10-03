import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponseDto {
  @ApiProperty({ example: 'failed' })
  status: string;

  @ApiProperty({ example: 'ABCXYZ with id #5 not found' })
  message: string;
}
