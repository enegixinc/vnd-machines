import { Injectable, Logger } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private readonly nestConfigService: NestConfigService,
    private readonly logger: Logger
  ) {}

  get<T>(propertyPath: string): T {
    const resolvedEnv = this.nestConfigService.get<T>(propertyPath);
    if (resolvedEnv) {
      this.logger.warn(
        `ConfigService resolved the property path: ${propertyPath}, value: ${resolvedEnv}`
      );
      return resolvedEnv;
    }
    throw new Error(
      `ConfigService could not resolve the property path: ${propertyPath}, please check your .env file, NODE_ENV = ${process.env['NODE_ENV']}`
    );
  }
}
