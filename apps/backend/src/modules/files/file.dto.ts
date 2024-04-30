import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty()
  filename: string;
  @ApiProperty()
  originalname: string;
  @ApiProperty()
  size: number;
  @ApiProperty()
  url: string;
}
