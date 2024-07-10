import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { IsNotEmpty } from 'class-validator';

const { CREATE, UPDATE } = CrudValidationGroups;

export class FileDto {
  @ApiProperty()
  @IsNotEmpty({ groups: [CREATE, UPDATE] })
  filename: string;
  @ApiProperty()
  @IsNotEmpty({ groups: [CREATE, UPDATE] })
  originalname: string;
  @ApiProperty()
  @IsNotEmpty({ groups: [CREATE, UPDATE] })
  size: number;
  @ApiProperty()
  @IsNotEmpty({ groups: [CREATE, UPDATE] })
  url: string;
}
