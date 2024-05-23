import { Body, Controller, Param, Post } from '@nestjs/common';
import { FillRequestDto } from './dto/requests/fill.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('machines')
@Controller()
@Public()
export class MachinesController {
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
