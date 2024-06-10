'use client';

import { Edit, useForm } from '@refinedev/antd';
import React from 'react';
import SupplierForm from '@app/suppliers/form';

export default function BrandEdit() {
  const { formProps, saveButtonProps } = useForm({
    resource: 'users',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <SupplierForm formProps={formProps} />
    </Edit>
  );
}
