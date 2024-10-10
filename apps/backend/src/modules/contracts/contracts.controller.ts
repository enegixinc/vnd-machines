import { Controller } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { ContractEntity } from './entities/contract.entity';
import { saneOperationsId } from '../../common/swagger.config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateContractDto } from './dto/request/create-contract.dto';
import { SerializedContractDto } from './dto/response/serialized-contract.dto';
import { ContractsService } from './contracts.service';
import { UpdateContractDto } from './dto/request/update-contract.dto';
import { UserEntity } from '../users/entities/user.entity';
import { UserRole } from '@core';

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
    limit: 10,

    join: {
      supplier: {
        exclude: ['password'],
      },
      // payments: {
      //   eager: true,
      // },
      files: {},
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
    update: UpdateContractDto,
  },
  serialize: {
    get: SerializedContractDto,
    create: SerializedContractDto,
  },
})
@CrudAuth({
  property: 'user',
  // if admin return everything, if supplier return the products they supply
  // or the products they created
  filter: (user: UserEntity) => {
    if (user.role === UserRole.ADMIN) return;

    return {
      supplier_id: user._id,
    };
  },
  persist: (user: UserEntity) => ({
    createdBy: user._id,
  }),
})
@Controller('contracts')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('contracts')
export class ContractsController implements CrudController<ContractEntity> {
  constructor(private readonly contractsService: ContractsService) {}
  service = this.contractsService;
}
