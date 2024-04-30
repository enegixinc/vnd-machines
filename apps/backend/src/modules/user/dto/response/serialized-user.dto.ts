import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../../user.entity';

export class SerializedUserDto extends OmitType(UserEntity, ['password']) {}
