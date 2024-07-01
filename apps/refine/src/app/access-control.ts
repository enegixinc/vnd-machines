'use client';
import { AccessControlProvider } from '@refinedev/core';
import Cookies from 'js-cookie';
import { UserRole } from '@core';

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    if (!resource) return { can: false };

    const user = Cookies.get('user');
    if (!user) return { can: false };

    const parsedUser = JSON.parse(user);
    const userRole = parsedUser.role;

    if (userRole === UserRole.ADMIN) {
      return { can: true };
    }

    if (userRole === UserRole.SUPPLIER) {
      const hiddenResources = ['machines', 'suppliers', 'brands', 'categories'];

      const disabledActions: Record<string, string[]> = {
        requests: ['edit', 'delete'],
        products: ['edit', 'delete'],
        contracts: ['edit', 'delete', 'create'],
      };

      if (hiddenResources.includes(resource)) {
        return { can: false };
      }

      if (disabledActions[resource]?.includes(action)) {
        return { can: false };
      }

      return { can: true };
    }

    return { can: false };
  },
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: true,
    },
  },
};
