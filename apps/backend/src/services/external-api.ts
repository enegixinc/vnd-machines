import { MagexConnector } from '@backend/magex-connector';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { GlobalResponseError } from '../common/responses/GlobalResponseError.dto';

type Middleware<T> = (value: T) => Promise<T> | T;

export const magexClient = new MagexConnector({
  BASE: process.env.MAGEX_API_URL,
});

// TODO: add unified backend error handling
const errorHandler: Middleware<AxiosResponse> = async (response) => {
  if (response.status.toString().startsWith('4')) {
    switch (response.status) {
      case 401:
        console.error(response);
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
  if (request.headers.Authorization) return request;
  else {
    const data = (await magexClient.auth.postUsersLogin({
      formData: {
        email: 'meshari.alobaidi@tryvnd.com',
        password: '3d55e04b',
      },
    })) as unknown as {
      accessToken: string;
    };
    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${data.accessToken}`,
      },
    };
  }
};

magexClient.request.config.interceptors.response.use(errorHandler);
magexClient.request.config.interceptors.response.use(successHandler);

magexClient.request.config.interceptors.request.use(attachHeaders);
