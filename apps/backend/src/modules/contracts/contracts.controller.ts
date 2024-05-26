import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { ContractEntity } from './entities/contract.entity';
import { saneOperationsId } from '../../common/swagger.config';
import { ApiTags } from '@nestjs/swagger';
import { CreateContractDto } from './dto/request/create-contract.dto';
import { Public } from '../auth/decorators/public.decorator';
import { SerializedContractDto } from './dto/response/serialized-contract.dto';
import { ContractsService } from './contracts.service';

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
        exclude: ['password'],
      },
      'supplier.brands': {
        eager: true,
        alias: 'brands',
      },
      'supplier.products': {
        eager: true,
        alias: 'products',
      },
      'supplier.categories': {
        eager: true,
        alias: 'categories',
      },
    },
  },
  routes: {
    ...saneOperationsId,
    // createOneBase: {
    //   // decorators: [...saneOperationsId.createOneBase.decorators, Public],
    // },
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  dto: {
    create: CreateContractDto,
  },
  serialize: {
    get: SerializedContractDto,
    create: SerializedContractDto,
  },
})
@Controller('contracts')
@Public()
@ApiTags('contracts')
export class ContractsController implements CrudController<ContractEntity> {
  constructor(private readonly contractsService: ContractsService) {}
  service = this.contractsService;
}
