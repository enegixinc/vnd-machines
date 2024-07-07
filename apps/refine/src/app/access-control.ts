'use client';
import { AccessControlProvider } from '@refinedev/core';
import { UserRole } from '@core';

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    if (!resource) return { can: false };
    const userRole =
      localStorage.getItem('role') || (UserRole.SUPPLIER as UserRole);

    if (userRole === UserRole.ADMIN) {
      const disabledActions: Record<string, string[]> = {
        orders: ['edit', 'create', 'delete'],
      };

      if (disabledActions[resource]?.includes(action)) {
        return { can: false };
      }

      return { can: true };
    }

    if (userRole === UserRole.SUPPLIER) {
      const hiddenResources = [
        'machines',
        'suppliers',
        'brands',
        'categories',
        'admins',
        'dashboard',
      ];

      const disabledActions: Record<string, string[]> = {
        requests: ['edit', 'delete'],
        products: ['edit', 'delete'],
        contracts: ['edit', 'delete', 'create'],
        dashboard: ['list'],
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
