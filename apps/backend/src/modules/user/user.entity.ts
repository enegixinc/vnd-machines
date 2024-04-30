import { Column, DeleteDateColumn, Entity } from 'typeorm';
import { IUser, UserRole } from '@core';
import { DatabaseEntity } from '../../common/database.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  EmailApiProperty,
  PasswordApiProperty,
} from '../../common/decorators/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';

const { CREATE, UPDATE } = CrudValidationGroups;
@Entity()
export class UserEntity extends DatabaseEntity implements IUser {
  @Column({ type: 'varchar', length: 100, nullable: false })
  @ApiProperty({
    example: 'John',
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({
    always: true,
    message: 'First name must be a string',
  })
  @MaxLength(100, { always: true })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @ApiProperty({
    example: 'Doe',
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({
    always: true,
    groups: [CREATE, UPDATE],
    message: 'First name must be a string',
  })
  @MaxLength(100, { always: true })
  lastName: string;

  @Column({
    unique: true,
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @EmailApiProperty()
  email: string;

  @Column()
  @PasswordApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SUPPLIER,
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty({
    enum: UserRole,
    default: UserRole.SUPPLIER,
    example: UserRole.SUPPLIER,
  })
  role: UserRole;

  @IsPhoneNumber()
  @Column({ type: 'varchar', length: 20, unique: true })
  @ApiProperty({
    example: '+201554891929',
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  phoneNumber: string;

  @Column({ type: 'boolean', default: true })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty({
    example: true,
  })
  active: boolean;

  @DeleteDateColumn() deletedAt?: Date;

  // @ManyToMany(() => ProductEntitsy, (product) => product.supplierId)
  // products: IProduct[];
}
