import { Controller } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { ContractEntity } from './entities/contract.entity';
import { saneOperationsId } from '../../common/swagger.config';

@Crud({
  model: {
    type: ContractEntity,
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
    softDelete: true,
    limit: 20,
    maxLimit: 100,
    join: {
      supplier: {
        eager: true,
        alias: 'users',
      },
    },
  },
  routes: {
    ...saneOperationsId,
    // createOneBase: {
    //   // decorators: [...saneOperationsId.createOneBase.decorators, Public],
    // },
    exclude: [
      'replaceOneBase',
      'createManyBase',
      'deleteOneBase',
      'recoverOneBase',
    ],
  },
})
@Controller('contracts')
export class ContractsController {}
