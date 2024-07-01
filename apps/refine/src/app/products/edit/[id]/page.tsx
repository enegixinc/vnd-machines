'use client';

import { Edit, useForm, useSelect } from '@refinedev/antd';
import React from 'react';
import { ProductForm } from '@app/products/form';
import { Spin } from 'antd';

export default function CategoryEdit() {
  const { formProps, saveButtonProps, formLoading } = useForm({
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

  if (formLoading) {
    return (
      <Spin
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <ProductForm formProps={formProps} />
    </Edit>
  );
}
