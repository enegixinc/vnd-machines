import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';
import { Refine } from '@refinedev/core';
import { DevtoolsProvider } from '@providers/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider from '@refinedev/nextjs-router';

import { dataProvider } from '@providers/data-provider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@refinedev/antd/dist/reset.css';
import { ColorModeContextProvider } from '@contexts/color-mode';
import { authProvider } from '@providers/auth-provider';
import { useNotificationProvider } from '@refinedev/antd';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineCategory } from 'react-icons/md';
import { TbBrandShopee } from 'react-icons/tb';
import { IoGitPullRequestSharp, IoPricetagsOutline } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi';
import { PiUsersThree } from 'react-icons/pi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { accessControlProvider } from '@app/access-control';
import { RiTimerFlashLine } from 'react-icons/ri';

export const metadata: Metadata = {
  title: 'VND Machines',
  description: 'VND Machines',
  icons: {
    icon: '/logo/vnd-icon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  const defaultMode = theme?.value === 'dark' ? 'dark' : 'light';

  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <AntdRegistry>
              <ColorModeContextProvider defaultMode={defaultMode}>
                <DevtoolsProvider>
                  <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider}
                    notificationProvider={useNotificationProvider}
                    authProvider={authProvider}
                    accessControlProvider={accessControlProvider}
                    resources={[
                      {
                        name: 'dashboard',
                        list: '/dashboard',
                        meta: {
                          canDelete: false,
                          canCreate: false,
                          canUpdate: false,
                          label: 'Dashboard',
                          icon: <AiOutlineDashboard />,
                        },
                      },
                      {
                        name: 'suppliers',
                        list: '/suppliers',
                        create: '/suppliers/create',
                        edit: '/suppliers/edit/:id',
                        show: '/suppliers/show/:id',
                        meta: {
                          canDelete: true,
                          icon: <PiUsersThree />,
                        },
                      },
                      {
                        name: 'admins',
                        list: '/admins',
                        create: '/admins/create',
                        edit: '/admins/edit/:id',
                        show: '/admins/show/:id',
                        meta: {
                          canDelete: true,
                          icon: <PiUsersThree />,
                        },
                      },
                      {
                        name: 'products',
                        list: '/products',
                        create: '/products/create',
                        edit: '/products/edit/:id',
                        show: '/products/show/:id',
                        meta: {
                          canDelete: true,
                          icon: <BiCategoryAlt />,
                        },
                      },
                      {
                        name: 'brands',
                        list: '/brands',
                        create: '/brands/create',
                        edit: '/brands/edit/:id',
                        show: '/brands/show/:id',
                        meta: {
                          canDelete: true,
                          icon: <TbBrandShopee />,
                        },
                      },
                      {
                        name: 'categories',
                        list: '/categories',
                        create: '/categories/create',
                        edit: '/categories/edit/:id',
                        show: '/categories/show/:id',
                        meta: {
                          canDelete: true,
                          icon: <MdOutlineCategory />,
                        },
                      },
                      {
                        name: 'contracts',
                        list: '/contracts',
                        create: '/contracts/create',
                        edit: '/contracts/edit/:id',
                        show: '/contracts/show/:id',
                        meta: {
                          canDelete: true,
                          icon: <RiTimerFlashLine />,
                        },
                      },
                      {
                        name: 'orders',
                        list: '/orders',
                        show: '/orders/show/:id',
                        meta: {
                          canDelete: false,
                          canCreate: false,
                          canUpdate: false,
                          icon: <IoPricetagsOutline />,
                        },
                      },
                      {
                        name: 'requests',
                        list: '/requests',
                        show: '/requests/show/:id',
                        create: '/requests/create',
                        // edit: '/requests/edit/:id',
                        meta: {
                          icon: <IoGitPullRequestSharp />,
                        },
                      },
                      {
                        name: 'machines',
                        list: '/machines',
                        show: '/machines/show/:id',
                        meta: {
                          canDelete: false,
                          icon: <HiOutlineUsers />,
                        },
                      },
                    ]}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: false,
                      useNewQueryKeys: true,
                      projectId: 'K3OYTs-NhUp07-HHJSZT',
                    }}
                  >
                    {children}
                    <RefineKbar />
                  </Refine>
                </DevtoolsProvider>
              </ColorModeContextProvider>
            </AntdRegistry>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
