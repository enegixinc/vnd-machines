import { Controller, Get, Inject } from '@nestjs/common';
import { MagexService } from '../../services/magex/magex.service';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MagexService) private readonly magexService: MagexService
  ) {}

  @Get('getOrders')
  getOrders() {
    return this.magexService.orders.postOrders();
  }
}
