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

export const metadata: Metadata = {
  title: 'VND Machines',
  description: 'VND Machines',
  icons: {
    icon: '/favicon.ico',
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
                    resources={[
                      {
                        name: 'suppliers',
                        list: '/suppliers',
                        create: '/suppliers/create',
                        edit: '/suppliers/edit/:id',
                        show: '/suppliers/show/:id',
                        meta: {
                          canDelete: true,
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
                        },
                      },
                    ]}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
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