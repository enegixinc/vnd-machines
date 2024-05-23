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

@Global()
@Injectable()
export class MagexService extends MagexConnector implements OnModuleInit {
  private accessToken: string;

  constructor(private readonly configService: ConfigService) {
    super({
      BASE: configService.get('MAGEX_API_URL'),
    });

    this.request.config.interceptors.request.use(this.handleRequest.bind(this));
    this.request.config.interceptors.response.use(
      this.handleResponseError.bind(this)
    );
  }

  private async handleRequest(request: AxiosResponse) {
    console.log('THIS', this);
    console.log('Request', request);
    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${this.accessToken}`,
        test: 'test',
      },
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
  async login() {
    console.log('Logging in to Magex');
    const { accessToken } = await this.auth.postUsersLogin({
      formData: {
        email: this.configService.get('MAGEX_EMAIL'),
        password: this.configService.get('MAGEX_PASSWORD'),
      },
    });
    console.log('Logged in to Magex', accessToken);
    this.accessToken = accessToken;

    // Ensure HEADERS is an object before assigning values to it
    if (!this.request.config.HEADERS) {
      this.request.config.HEADERS = {};
    }

    Object.assign(this.request.config.HEADERS, {
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}
