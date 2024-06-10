'use client';

import type { AuthProvider } from '@refinedev/core';
import Cookies from 'js-cookie';
import { vndClient } from '@providers/api';

const setTokens = (accessToken: string, refreshToken: string) => {
  vndClient.request.config.TOKEN = accessToken;
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
    const auth = Cookies.get('auth');
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
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
