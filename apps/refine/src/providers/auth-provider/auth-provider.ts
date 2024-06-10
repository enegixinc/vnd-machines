'use client';

import type { AuthProvider } from '@refinedev/core';
import Cookies from 'js-cookie';
import { vndClient } from '@providers/api';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const isAuth = () => {
  return !!Cookies.get(ACCESS_TOKEN);
};

const setTokens = (accessToken: string, refreshToken: string) => {
  vndClient.request.config.TOKEN = accessToken;
  Cookies.set(ACCESS_TOKEN, accessToken, { path: '/' });
  Cookies.set(REFRESH_TOKEN, refreshToken, { path: '/' });
};

const removeTokens = () => {
  vndClient.request.config.TOKEN = undefined;
  Cookies.remove(ACCESS_TOKEN, { path: '/' });
  Cookies.remove(REFRESH_TOKEN, { path: '/' });
};

const getTokens = () => {
  const auth = Cookies.get('auth');
  if (auth) {
    return JSON.parse(auth);
  }
  return null;
};

export const authProvider: AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    // @ts-ignore
    const { accessToken, refreshToken } =
      await vndClient.auth.authControllerLogin({
        requestBody: { email, password },
      });

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      return {
        success: true,
        redirectTo: '/',
      };
    }

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: 'Invalid username or password',
      },
    };
  },
  logout: async () => {
    removeTokens();
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    if (isAuth()) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => {
    if (isAuth()) {
      // const parsedUser = JSON.parse(auth);
      // return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    if (isAuth()) {
      return vndClient.auth.authControllerMe();
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
