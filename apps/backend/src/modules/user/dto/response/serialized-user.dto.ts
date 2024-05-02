import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserEntity } from '../../user.entity';
import { SerializedProductDto } from '../../../products/dto/response/serialized-product.dto';

export class SerializedUserDto extends OmitType(UserEntity, ['password']) {
  @ApiProperty({
    type: [SerializedProductDto],
  })
  products: SerializedProductDto[];
}
