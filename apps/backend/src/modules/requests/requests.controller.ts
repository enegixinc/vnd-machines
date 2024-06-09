import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { saneOperationsId } from '../../common/swagger.config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestsService } from './requests.service';
import { RequestEntity } from './request.entity';

@Crud({
  model: {
    type: RequestEntity,
  },
  dto: {
    create: CreateRequestDto,
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
      suppliers: {
        alias: 'users',
        exclude: ['password'],
      },
      products: {},
      categories: {},
      orders: {},
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
export class RequestsController implements CrudController<RequestEntity> {
  constructor(public service: RequestsService) {}

  get base(): CrudController<RequestEntity> {
    return this;
  }
}
