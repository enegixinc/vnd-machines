import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { saneOperationsId } from '../../../common/swagger.config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFillRequestDto } from './dto/create-fill-request.dto';
import { RequestsService } from './requests.service';
import { FillRequestEntity } from './fill-request.entity';

@Crud({
  model: {
    type: FillRequestEntity,
  },
  dto: {
    create: CreateFillRequestDto,
  },
  params: {
    id: {
      field: '_id',
      type: 'string',
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
      machine: {
        alias: 'machine',
      },
      products: {
        alias: 'products',
        eager: true,
      },
      'products.product': {
        alias: 'singleProduct',
        eager: true,
      },
    },
  },
  routes: {
    ...saneOperationsId,
    exclude: ['replaceOneBase'],
  },
})
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('requests')
@ApiBearerAuth('JWT-auth')
@Controller('requests')
export class RequestsController implements CrudController<FillRequestEntity> {
  constructor(public service: RequestsService) {}

  get base(): CrudController<FillRequestEntity> {
    return this;
  }
}
