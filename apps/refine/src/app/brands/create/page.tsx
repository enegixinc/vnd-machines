'use client';

import { Create, useForm } from '@refinedev/antd';
import React from 'react';
import { BrandForm } from '@app/brands/form';

export default function BrandCreate() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <BrandForm formProps={formProps} />
    </Create>
  );
}
