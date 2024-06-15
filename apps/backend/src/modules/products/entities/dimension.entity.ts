import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';
import { DatabaseEntity } from '../../../common/database.entity';
import { Dimension } from '@core';

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
    Column({ type: 'numeric' })(target, key);
  };
};

@Entity()
export class DimensionEntity extends DatabaseEntity implements Dimension {
  @DimensionNumber()
  height: number;

  @DimensionNumber()
  length: number;

  @DimensionNumber()
  width: number;
}
