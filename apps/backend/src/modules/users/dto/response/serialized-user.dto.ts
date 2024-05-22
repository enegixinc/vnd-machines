import { ApiProperty } from '@nestjs/swagger';
import { SerializedProductDto } from '../../../products/dto/response/serialized-product.dto';
import {
  IDocument,
  ISerializedBrand,
  ISerializedContract,
  ISerializedUser,
} from '@core';
import { DatabaseEntity } from '../../../../common/database.entity';
import { decorate, Mixin } from 'ts-mixer';

import { SharedUserDto } from '../shared/shared-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { SerializedBrandDto } from '../../../brands/dto/response/serialized-brand.dto';
import { SerializedContractDto } from '../../../contracts/dto/response/serialized-contract.dto';

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

  @decorate(
    ApiProperty({
      type: () => [SerializedBrandDto],
    })
  )
  brand: ISerializedBrand;

  @decorate(
    ApiProperty({
      type: () => [SerializedContractDto],
    })
  )
  contracts: ISerializedContract[];

  constructor(props: UserEntity) {
    if (props.password) delete props.password;
    super(props);
    Object.assign(this, props);
  }
}
