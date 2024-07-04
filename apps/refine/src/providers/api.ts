import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { VNDClient } from '@frontend/api-sdk';
import Cookies from 'js-cookie';
import { envSchema } from '@providers/env';
// eslint-disable-next-line no-unused-vars
type Middleware<T> = (value: T) => Promise<T> | T;
export const vndClient = new VNDClient({
  // BASE: 'https://staging-vnd-api.5ostudios.com',
  BASE: envSchema.NEXT_PUBLIC_API_URL,
  HEADERS: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
});
// Middleware to attach headers
const attachHeaders = async (request: AxiosRequestConfig<unknown>) => {
  const auth = Cookies.get('auth');
  if (auth) {
    const { accessToken } = JSON.parse(auth);
    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
  return request;
};

// Middleware to handle errors
const errorHandler = async (response: AxiosResponse) => {
  if (response.status === 401) {
    Cookies.remove('auth', { path: '/' });
    // Optionally, you can redirect the user to login
    window.location.href = '/login';
  }
  return response;
};
vndClient.request.config.interceptors.request.use(attachHeaders);
vndClient.request.config.interceptors.response.use(errorHandler);

export const axiosInstance = axios.create({
  url: envSchema.NEXT_PUBLIC_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const auth = Cookies.get('auth');
    if (auth) {
      const { accessToken } = JSON.parse(auth);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
