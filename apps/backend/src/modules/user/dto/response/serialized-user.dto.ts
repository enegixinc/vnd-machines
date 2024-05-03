import { ApiProperty, OmitType } from '@nestjs/swagger';
import { SerializedProductDto } from '../../../products/dto/response/serialized-product.dto';
import { CreateUserDto } from '../request/create-user.dto';

export class SerializedUserDto extends OmitType(CreateUserDto, [
  'documents',
  'products',
]) {
  @ApiProperty({
    type: () => [SerializedProductDto],
  })
  products: SerializedProductDto[];
}
