import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { saneOperationsId } from '../../common/swagger.config';
import { PromotionEntity } from './promotion.entity';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotions.dto';
import { Public } from '../auth/decorators/public.decorator';

@Crud({
  model: {
    type: PromotionEntity,
  },
  dto: {
    create: CreatePromotionDto,
    update: UpdatePromotionDto,
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
    limit: 10,

    join: {
      products: {},
      categories: {},
      machines: {},
    },
  },
  routes: {
    ...saneOperationsId,
    exclude: ['replaceOneBase'],
  },
})
@Public()
@Controller('promotions')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('promotions')
@ApiBearerAuth('JWT-auth')
export class PromotionsController implements CrudController<PromotionEntity> {
  constructor(public service: PromotionsService) {}

  get base(): CrudController<PromotionEntity> {
    return this;
  }
}
