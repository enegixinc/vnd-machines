import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { IProduct, IUser, POLICY, UserRole } from '@core';
import { DatabaseEntity } from '../../common/database.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';
import { ProductEntity } from '../products/product.entity';

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
    nullable: false,
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty({
    example: 'email@example.com',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: POLICY.AUTH.PASSWORD.MAX_LENGTH,
  })
  @IsStrongPassword({
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    minLowercase: POLICY.AUTH.PASSWORD.MIN_LOWERCASE,
    minNumbers: POLICY.AUTH.PASSWORD.MIN_NUMBERS,
    minSymbols: POLICY.AUTH.PASSWORD.MIN_SYMBOLS,
    minUppercase: POLICY.AUTH.PASSWORD.MIN_UPPERCASE,
  })
  @ApiProperty({
    example: 'Password@123',
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    maxLength: POLICY.AUTH.PASSWORD.MAX_LENGTH,
  })
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

  @ManyToMany(() => ProductEntity, (product) => product.suppliers)
  @JoinTable({
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: '_id',
    },
  })
  products: IProduct[];
}
