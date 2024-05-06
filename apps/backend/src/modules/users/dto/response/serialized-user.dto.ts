import { ApiProperty } from '@nestjs/swagger';
import { SerializedProductDto } from '../../../products/dto/response/serialized-product.dto';
import { IDocument, ISerializedUser } from '@core';
import { DatabaseEntity } from '../../../../common/database.entity';
import { decorate, Mixin } from 'ts-mixer';

import { SharedUserDto } from '../shared/shared-user.dto';

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
}
