'use client';

import { Create, useForm } from '@refinedev/antd';
import React, { useState } from 'react';
import SupplierForm from '@app/suppliers/form';
import { UserEntity } from '@frontend/api-sdk';
import { CanAccess } from '@refinedev/core';

export default function SupplierCreate() {
  const { formProps, saveButtonProps } = useForm<UserEntity>({
    resource: 'users',
  });

  return (
    <CanAccess action="create" fallback={<div>Unauthorized</div>}>
      <Create saveButtonProps={saveButtonProps}>
        <SupplierForm formProps={formProps} />
      </Create>
    </CanAccess>
  );
}
