'use client';

import type { AuthProvider } from '@refinedev/core';
import Cookies from 'js-cookie';
import { axiosInstance, vndClient } from '@providers/api';

const setTokens = (accessToken: string, refreshToken: string) => {
  vndClient.request.config.HEADERS = {
    ...vndClient.request.config.HEADERS,
    Authorization: `Bearer ${accessToken}`,
  };

  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  console.log('vndClient.request.config.TOKEN', vndClient.request.config.TOKEN);
  Cookies.set('auth', JSON.stringify({ accessToken, refreshToken }), {
    expires: 30, // 30 days
    path: '/',
  });
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
    Cookies.remove('auth', { path: '/' });
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
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
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.role;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      const user = vndClient.auth.authControllerMe();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
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
