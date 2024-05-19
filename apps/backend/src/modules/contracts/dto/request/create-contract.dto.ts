import { ICreateContract, IUserEntity, ReferenceByID } from '@core';
import { UserExistsValidator } from '../../../users/validators/user-exists';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';
import { SharedContractDto } from '../shared';

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateContractDto
  extends SharedContractDto
  implements ICreateContract
{
  @Validate(UserExistsValidator)
  @ApiProperty({
    type: () => PickType(SerializedUserDto, ['_id']),
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  supplier: ReferenceByID<IUserEntity>;
}
