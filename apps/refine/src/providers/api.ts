import { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { VNDClient } from '@frontend/api-sdk';
// eslint-disable-next-line no-unused-vars
type Middleware<T> = (value: T) => Promise<T> | T;
export const vndClient = new VNDClient({
  BASE: 'https://staging-vnd-api.5ostudios.com',
  HEADERS: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
});
const errorHandler: Middleware<AxiosResponse> = async (response) => {
  // if (response.status === 401) await logout();

  return response;
};
const attachHeaders: Middleware<AxiosRequestConfig<unknown>> = async (
  request
) => {
  return {
    ...request,
    headers: {
      ...request.headers,
      // Authorization: `Bearer ${user.token}`,
    },
  };
};

vndClient.request.config.interceptors.request.use(attachHeaders);
vndClient.request.config.interceptors.response.use(errorHandler);
