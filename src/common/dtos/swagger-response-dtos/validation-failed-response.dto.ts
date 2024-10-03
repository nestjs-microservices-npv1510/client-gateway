import { ApiProperty } from '@nestjs/swagger';

export class ValidationFailedResponseDto {
  @ApiProperty({ example: 'failed' })
  status: string;

  @ApiProperty({
    type: [String], // Mảng các chuỗi thông báo lỗi
    example: ['XYZ must not be less than 1', 'Property XYZ should not exist'],
  })
  message: string[];
}
