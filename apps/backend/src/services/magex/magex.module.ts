import { MagexConnector } from '@backend/magex-connector';
import { ConfigService } from '@backend/config';
import { Global, Module, OnModuleInit } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Global()
@Module({
  providers: [ConfigService, RedisService],
})
export class MagexModule extends MagexConnector implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService
  ) {
    super({
      BASE: configService.get('MAGEX_API_URL'),
    });
  }
  onModuleInit() {
    this.auth
      .postUsersLogin({
        formData: {
          email: this.configService.get('MAGEX_EMAIL'),
          password: this.configService.get('MAGEX_PASSWORD'),
        },
      })
      .then((response) => {
        // @ts-ignore
        this.redisService.getClient().set('MAGEX_TOKEN', response.accessToken);
      });
  }
}
