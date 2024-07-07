'use client';

import { Create, useForm } from '@refinedev/antd';
import React from 'react';
import { UserEntity } from '@frontend/api-sdk';
import { CanAccess, useGo } from '@refinedev/core';
import AdminForm from '@app/admins/form';

export default function AdminCreate() {
  const go = useGo();
  const { formProps, saveButtonProps } = useForm<UserEntity>({
    resource: 'users',
    redirect: false,
    onMutationSuccess: () => {
      go({ to: '/admins' });
    },
  });

  return (
    <CanAccess action="create" fallback={<div>Unauthorized</div>}>
      <Create saveButtonProps={saveButtonProps}>
        <AdminForm action="create" formProps={formProps} />
      </Create>
    </CanAccess>
  );
}
