import { ApiProperty } from '@nestjs/swagger';
import { SerializedProductDto } from '../../../products/dto/response/serialized-product.dto';
import { IDocument, ISerializedBrand, ISerializedUser } from '@core';
import { DatabaseEntity } from '../../../../common/database.entity';
import { decorate, Mixin } from 'ts-mixer';

import { SharedUserDto } from '../shared/shared-user.dto';
import { UserEntity } from '../../entities/user.entity';

export class SerializedUserDto
  extends Mixin(DatabaseEntity, SharedUserDto)
  implements ISerializedUser
{
  @decorate(
    ApiProperty({
      type: () => [SerializedProductDto],
    })
  )
  products: SerializedProductDto[];

  // TODO: add this to the system
  documents: IDocument[];

  // TODO: add this to the system
  brand: ISerializedBrand;

  constructor(props: UserEntity) {
    console.log('props', props);
    super(props);
    Object.assign(this, props);
  }
}
