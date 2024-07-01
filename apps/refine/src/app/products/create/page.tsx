'use client';

import { Create, useForm, useSelect } from '@refinedev/antd';
import React from 'react';
import { ProductForm } from '@app/products/form';

export default function ProductCreate() {
  const { formProps, saveButtonProps } = useForm({
    meta: {
      join: [
        {
          field: 'supplier',
          select: ['_id', 'fullName'],
        },
        {
          field: 'category',
          select: ['_id', 'fullName'],
        },
        {
          field: 'brand',
          select: ['_id', 'fullName'],
        },
      ],
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <ProductForm formProps={formProps} />
    </Create>
  );
}
