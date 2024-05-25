import {
  BadRequestException,
  ForbiddenException,
  Global,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@backend/config';
import { MagexConnector } from '@backend/magex-connector';
import { GlobalResponseError } from '../../common/responses/GlobalResponseError.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { timer } from 'execution-time-decorators';

@Global()
@Injectable()
export class MagexService extends MagexConnector implements OnModuleInit {
  accessToken: string;

  constructor(private readonly configService: ConfigService) {
    super({
      BASE: configService.get('MAGEX_API_URL'),
    });

    this.request.config.interceptors.request.use(this.handleRequest.bind(this));

    this.request.config.interceptors.response.use(
      this.handleResponseError.bind(this)
    );
  }

  private handleRequest(request: AxiosResponse) {
    const headers = Object.assign({}, request.headers, {
      'auth-token': this.accessToken,
    });
    return {
      ...request,
      headers,
    };
  }

  private async handleResponseError(response: AxiosResponse) {
    if (response.status.toString().startsWith('4')) {
      switch (response.status) {
        case 401:
          throw new GlobalResponseError(
            response.status,
            response.statusText,
            '401',
            response.request
          );
        case 404:
          throw new NotFoundException();
        case 403:
          throw new ForbiddenException();
        case 400:
          throw new BadRequestException();
        default:
          throw new Error('Unknown error');
      }
    }

    return response;
  }

  async onModuleInit() {
    await this.login();
  }

  // TODO: use refresh tokens
  @Cron(CronExpression.EVERY_MINUTE)
  @timer()
  async login() {
    const { accessToken } = await this.auth.postUsersLogin({
      formData: {
        email: this.configService.get('MAGEX_EMAIL'),
        password: this.configService.get('MAGEX_PASSWORD'),
      },
    });
    this.accessToken = accessToken;
  }
}
