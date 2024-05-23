import { Injectable } from '@nestjs/common';
import { MagexConnector } from '@backend/magex-connector';

@Injectable()
export class MagexService extends MagexConnector {
  constructor() {
    super({
      BASE: process.env.MAGEX_API_URL,
    });
  }
}
