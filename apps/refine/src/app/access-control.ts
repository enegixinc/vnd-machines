'use client';
import { AccessControlProvider } from '@refinedev/core';
import Cookies from 'js-cookie';

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    const user = Cookies.get('user');
    if (!user)
      return {
        can: false,
      };
    const parsedUser = JSON.parse(user);
    const userRole = parsedUser.role;

    if (userRole === 'admin') {
      return { can: true };
    } else if (userRole === 'supplier') {
      // Hide machines, suppliers, brands, and categories for suppliers
      const hiddenResources = ['machines', 'suppliers', 'brands', 'categories'];
      if (hiddenResources.includes(resource)) {
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
