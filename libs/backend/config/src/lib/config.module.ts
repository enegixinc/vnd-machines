import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as process from 'process';

import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, Logger],
  exports: [ConfigService],
})
export class ConfigModule {
  constructor(private readonly logger: Logger) {
    this.logger.warn(
      'ConfigModule has been initialized in NODE_ENV = ' +
        process.env['NODE_ENV']
    );
  }
}
