import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

const DimensionNumber = () => {
  return (target: any, key: string) => {
    ApiProperty({
      example: 20,
      description: 'Dimension of the product',
      type: Number,
    })(target, key);
    IsOptional({ groups: [UPDATE] })(target, key);
    IsNumber({}, { groups: [UPDATE, CREATE] })(target, key);
    IsNotEmpty({ groups: [CREATE] })(target, key);
    Column({
      type: 'numeric',
      default: 0,
      transformer: {
        to: (value: number) => value,
        from: (value: string) => parseFloat(value),
      },
    })(target, key);
  };
};

export class DimensionEntity {
  @DimensionNumber()
  height: number;

  @DimensionNumber()
  length: number;

  @DimensionNumber()
  width: number;
}
