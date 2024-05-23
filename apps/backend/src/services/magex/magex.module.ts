import { ConfigService } from '@backend/config';
import { Global, Logger, Module } from '@nestjs/common';
import { MagexService } from './magex.service';

@Global()
@Module({
  providers: [ConfigService, Logger, MagexService],
  exports: [MagexService],
})
export class MagexModule {}
