'use client';
import { AuthPage as AuthPageBase } from '@refinedev/antd';
import type { AuthPageProps } from '@refinedev/core';
import React from 'react';
import Image from 'next/image';

export const AuthPage = (props: AuthPageProps) => {
  return (
    <AuthPageBase
      {...props}
      title={
        <Image
          src="/logo/vnd-logo-color.svg"
          alt="VND Machines"
          width={150}
          height={150}
          style={{ marginBottom: -60 }}
        />
      }
      formProps={{
        initialValues: { email: 'admin@example.com', password: 'Password@123' },
      }}
    />
  );
};
