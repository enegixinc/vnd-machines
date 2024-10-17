import { Controller } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { saneOperationsId } from '../../common/swagger.config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { UserEntity } from '../users/entities/user.entity';
import { UserRole } from '@core';
import { CreatePaymentDto } from './payments.dto';
import { PaymentsEntity } from './payments.entity';
import { SerializedPaymentDto } from './serialized-payment.dto';

@Crud({
  model: {
    type: PaymentsEntity,
  },
  params: {
    id: {
      field: '_id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    cache: 2000,
    alwaysPaginate: true,
    sort: [
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
    limit: 10,

    // join: {
    //   contract: {},
    //   supplier: {
    //     exclude: ['password'],
    //   },
    // },
  },
  serialize: {
    get: SerializedPaymentDto,
  },
  routes: {
    ...saneOperationsId,
    // createOneBase: {
    //   // decorators: [...saneOperationsId.createOneBase.decorators, Public],
    // },
    exclude: [
      'updateOneBase',
      'deleteOneBase',
      'replaceOneBase',
      'createManyBase',
      'replaceOneBase',
      'recoverOneBase',
    ],
  },
  dto: {
    create: CreatePaymentDto,
  },
})
@CrudAuth({
  property: 'user',
  // if admin return everything, if supplier return the products they supply
  // or the products they created
  filter: (user: UserEntity) => {
    if (user.role === UserRole.ADMIN) return;

    return {
      $or: [
        {
          createdBy: user._id,
        },
        {
          supplier_id: user._id,
        },
      ],
    };
  },
  persist: (user: UserEntity) => ({
    createdBy: user._id,
  }),
})
@Controller('payments')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('payments')
export class PaymentsController implements CrudController<PaymentsEntity> {
  constructor(private readonly PaymentsService: PaymentsService) {}
  service = this.PaymentsService;
}
