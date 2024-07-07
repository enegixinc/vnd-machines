'use client';

import { Create, useForm } from '@refinedev/antd';
import React from 'react';
import SupplierForm from '@app/suppliers/form';
import { UserEntity } from '@frontend/api-sdk';
import { CanAccess, useGo } from '@refinedev/core';

export default function SupplierCreate() {
  const go = useGo();
  const { formProps, saveButtonProps } = useForm<UserEntity>({
    resource: 'users',
    redirect: false,
    onMutationSuccess: () => {
      go({ to: '/suppliers' });
    },
  });

  return (
    <CanAccess action="create" fallback={<div>Unauthorized</div>}>
      <Create saveButtonProps={saveButtonProps}>
        <SupplierForm action="create" formProps={formProps} />
      </Create>
    </CanAccess>
  );
}
