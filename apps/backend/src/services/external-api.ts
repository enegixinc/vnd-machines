import { MagexConnector } from '@backend/magex-connector';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

type Middleware<T> = (value: T) => Promise<T> | T;

export const magexConnector = new MagexConnector({
  BASE: 'https://devapi.point24h.com/api',
  TOKEN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWVzaGFyaSIsInJvbGUiOiJVc2VyIiwiZW1haWwiOiJtZXNoYXJpLmFsb2JhaWRpQHRyeXZuZC5jb20iLCJmdWxsQWNjZXNzIjp0cnVlLCJsaW1pdHMiOnsidmlld19wcm9wb3NhbCI6dHJ1ZSwiZWRpdF9wcm9wb3NhbCI6dHJ1ZSwidmlld19zdG9jayI6dHJ1ZSwidmlld19tYWNoaW5lIjp0cnVlLCJlZGl0X21hY2hpbmUiOnRydWUsInZpZXdfcHJvZCI6dHJ1ZSwiZWRpdF9wcm9kIjp0cnVlLCJ2aWV3X2NhdGUiOnRydWUsImVkaXRfY2F0ZSI6dHJ1ZSwidmlld19icmFuZCI6dHJ1ZSwiZWRpdF9icmFuZCI6dHJ1ZSwidmlld19yZWNlaXB0Ijp0cnVlLCJlZGl0X3JlY2VpcHQiOnRydWUsInZpZXdfc3MiOnRydWUsImVkaXRfc3MiOnRydWUsImVkaXRfZ3JvdXAiOnRydWUsImVkaXRfdXNlciI6dHJ1ZSwidmlld19wbGFubyI6dHJ1ZSwiZWRpdF9wbGFubyI6dHJ1ZSwidmlld19wcm9tbyI6dHJ1ZSwiZWRpdF9wcm9tbyI6dHJ1ZSwidmlld19yZXBvcnQiOnRydWUsInZpZXdfdHJhbnMiOnRydWV9LCJpZCI6IjY1N2M0ZTdiYjBmMjg5MTIyNGQ1ZTliMCIsImlhdCI6MTcxNDU2NzUyOSwiZXhwIjoxNzE0NTY4NDI5fQ.yLhv64V3-8J2ihk9S0ruVGqBSeAVWGTQv06SxVH6rHQ',
});

// TODO: unified backend error handling
const errorHandler: Middleware<AxiosResponse> = async (response) => {
  if (response.status.toString().startsWith('4')) {
    switch (response.status) {
      case 401:
        throw new UnauthorizedException();
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
};

const successHandler: Middleware<AxiosResponse> = async (response) => {
  // if (response.status === 201) throw new Error('Created successfully');
  // if (response.status === 204)
  //
  // return response;

  return response;
};

const attachHeaders: Middleware<AxiosRequestConfig<unknown>> = async (
  request
) => {
  return {
    ...request,
    headers: {
      ...request.headers,
      Authorization: `Bearer ${'token'}`,
      'X-Pos-Rk': 'remote_key',
    },
  };
};

magexConnector.request.config.interceptors.response.use(errorHandler);
magexConnector.request.config.interceptors.response.use(successHandler);

magexConnector.request.config.interceptors.request.use(attachHeaders);
