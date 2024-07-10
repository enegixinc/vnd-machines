'use client';

import { Create, useForm } from '@refinedev/antd';
import React from 'react';
import { CategoryForm } from '@app/categories/form';

export default function CategoryCreate() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <CategoryForm formProps={formProps} />
    </Create>
  );
}
