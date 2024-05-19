import { Controller } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { ContractEntity } from './entities/contract.entity';
import { saneOperationsId } from '../../common/swagger.config';
import { ApiTags } from '@nestjs/swagger';
import { CreateContractDto } from './dto/request/create-contract.dto';
import { Public } from '../auth/decorators/public.decorator';

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
  dto: {
    create: CreateContractDto,
  },
})
@Controller('contracts')
@Public()
@ApiTags('contracts')
export class ContractsController {}
