import type { IResourceItem } from '@refinedev/core';

import { DashboardOutlined, TeamOutlined } from '@ant-design/icons';

export const resources: IResourceItem[] = [
  {
    name: 'dashboard',
    list: '/',
    meta: {
      label: 'Dashboard',
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon: <DashboardOutlined />,
    },
  },
  {
    name: 'products',
    list: '/products',
    create: '/products/create',
    edit: '/products/edit/:id',
    show: '/products/show/:id',
    meta: {
      label: 'Products',
      // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
      icon: <TeamOutlined />,
    },
  },
];
