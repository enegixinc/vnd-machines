import React from 'react';
import { ThemedLayoutV2 } from '@refinedev/antd';
import { Header, Title } from '@components/header';
import { authProviderServer } from '@providers/auth-provider';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.authenticated) {
    return redirect(data?.redirectTo || '/login');
  }

  return (
    <ThemedLayoutV2 Title={Title} Header={Header}>
      {children}
    </ThemedLayoutV2>
  );
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
  };
}
