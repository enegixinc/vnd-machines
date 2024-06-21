'use client';

import { Create, useForm } from '@refinedev/antd';
import React, { useState } from 'react';
import SupplierForm from '@app/suppliers/form';
import { UserEntity } from '@frontend/api-sdk';

export default function SupplierCreate() {
  const { formProps, saveButtonProps } = useForm<UserEntity>({
    resource: 'users',
  });

  const [values, setValues] = useState<UserEntity>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <SupplierForm formProps={formProps} />
    </Create>
  );
}
