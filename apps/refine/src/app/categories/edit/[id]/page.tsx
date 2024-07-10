'use client';

import { Edit, useForm } from '@refinedev/antd';
import { Spin } from 'antd';
import React from 'react';
import { CategoryForm } from '@app/categories/form';

export default function CategoryEdit() {
  const { formProps, saveButtonProps, formLoading } = useForm({});

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
      <CategoryForm formProps={formProps} />
    </Edit>
  );
}
