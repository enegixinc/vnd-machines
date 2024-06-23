import type { AuthProvider } from '@refinedev/core';

import { vndClient } from '@/providers/api';

export const emails = [
  'michael.scott@dundermifflin.com',
  'jim.halpert@dundermifflin.com',
  'pam.beesly@dundermifflin.com',
  'dwight.schrute@dundermifflin.com',
  'angela.martin@dundermifflin.com',
  'stanley.hudson@dundermifflin.com',
  'phyllis.smith@dundermifflin.com',
  'kevin.malone@dundermifflin.com',
  'oscar.martinez@dundermifflin.com',
  'creed.bratton@dundermifflin.com',
  'meredith.palmer@dundermifflin.com',
  'ryan.howard@dundermifflin.com',
  'kelly.kapoor@dundermifflin.com',
  'andy.bernard@dundermifflin.com',
  'toby.flenderson@dundermifflin.com',
];

const randomEmail = emails[Math.floor(Math.random() * emails.length)];

export const demoCredentials = {
  email: 'email@example.com',
  password: 'Password@123',
};

export const authProvider: AuthProvider = {
  login: async ({ email, providerName, accessToken, refreshToken }) => {
    if (accessToken && refreshToken) {
      vndClient.request.config.HEADERS = {
        ...vndClient.request.config.HEADERS,
        Authorization: `Bearer ${accessToken}`,
      };

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      return {
        success: true,
        redirectTo: '/',
      };
    }

    // if (providerName) {
    //   window.location.href = `${API_BASE_URL}/auth/${providerName}`;
    //
    //   return {
    //     success: true,
    //   };
    // }

    try {
      // @ts-ignore
      const { accessToken, refreshToken } =
        await vndClient.auth.authControllerLogin({
          requestBody: {
            email,
            password: demoCredentials.password,
          },
        });

      vndClient.request.config.HEADERS = {
        ...vndClient.request.config.HEADERS,
        Authorization: `Bearer ${accessToken}`,
      };

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      return {
        success: true,
        redirectTo: '/',
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: 'message' in error ? error.message : 'Login failed',
          name: 'name' in error ? error.name : 'Invalid email or password',
        },
      };
    }
  },
  register: async ({ email, password }) => {
    throw new Error('Register is not supported');
  },
  logout: async () => {
    // client.setHeaders({
    //   Authorization: '',
    // });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    return {
      success: true,
      redirectTo: '/login',
    };
  },
  onError: async (error) => {
    if (error?.statusCode === 'UNAUTHENTICATED') {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    try {
      await vndClient.auth.authControllerMe();

      return {
        authenticated: true,
      };
    } catch (error) {
      return {
        authenticated: false,
      };
    }
  },
  forgotPassword: async () => {
    return {
      success: true,
      redirectTo: '/update-password',
    };
  },
  updatePassword: async () => {
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  getIdentity: async () => await vndClient.auth.authControllerMe(),
};
