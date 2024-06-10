'use client';

import { Create, useForm } from '@refinedev/antd';
import React from 'react';
import SupplierForm from '@app/suppliers/form';

export default function BrandCreate() {
  const { formProps, saveButtonProps } = useForm({
    resource: 'users',
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <SupplierForm formProps={formProps} />
    </Create>
  );
}
