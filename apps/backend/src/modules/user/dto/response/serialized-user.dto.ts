import { ApiProperty, OmitType } from '@nestjs/swagger';
import { SerializedProductDto } from '../../../products/dto/response/serialized-product.dto';
import { CreateUserDto } from '../request/create-user.dto';
import { IDocument, ISerializedUser } from '@core';
import { DatabaseEntity } from '../../../../common/database.entity';
import { Mixin } from 'ts-mixer';

export class SerializedUserDto
  extends Mixin(
    DatabaseEntity,
    OmitType(CreateUserDto, ['documents', 'products'])
  )
  implements ISerializedUser
{
  @ApiProperty({
    type: () => [SerializedProductDto],
  })
  products: SerializedProductDto[];

  // TODO: add this to the system
  documents: IDocument[];
}
