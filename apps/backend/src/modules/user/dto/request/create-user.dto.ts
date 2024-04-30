import { UserEntity } from '../../user.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateUserDto extends OmitType(UserEntity, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {}
