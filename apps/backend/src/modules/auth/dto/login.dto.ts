import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/request/create-user.dto';

export class LoginDto extends PickType(CreateUserDto, ['email', 'password']) {}
