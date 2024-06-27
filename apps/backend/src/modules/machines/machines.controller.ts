import { Body, Controller, Param, Post } from '@nestjs/common';
import { FillRequestDto } from './dto/requests/fill.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Crud, CrudController } from '@dataui/crud';
import { saneOperationsId } from '../../common/swagger.config';
import { MachineEntity } from './entities/machine.entity';
import { MachinesService } from './machines.service';

@Crud({
  model: {
    type: MachineEntity,
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
      // suppliers: {
      //   exclude: ['password'],
      // },
      product: {
        eager: true,
        alias: 'product',
      },
      'product.product': {
        eager: true,
        alias: 'singleProduct',
      },
      'product.product.supplier': {
        exclude: ['password'],
        alias: 'product.product.supplier',
      },
      // 'product.product.category': {},
      // 'product.product.brand': {},
    },
  },
  routes: {
    ...saneOperationsId,
    exclude: [
      'replaceOneBase',
      'createManyBase',
      'deleteOneBase',
      'updateOneBase',
      'recoverOneBase',
      'createOneBase',
    ],
  },
})
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('machines')
@Controller('machines')
export class MachinesController implements CrudController<MachineEntity> {
  constructor(public service: MachinesService) {}

  get base(): CrudController<MachineEntity> {
    return this;
  }

  @Post('fill/:machineId')
  @ApiOperation({ operationId: 'fill' })
  @ApiParam({
    name: 'machineId',
    type: String,
  })
  @ApiBody({
    type: FillRequestDto,
  })
  fill(
    // TODO: validate machine exists
    @Param('machineId') machineId: string,
    @Body() fillRequestDto: FillRequestDto
  ) {
    console.log({ machineId, fillRequestDto });
    return fillRequestDto;
  }
}
