'use client';

import { Edit, useForm } from '@refinedev/antd';
import React from 'react';
import { BrandForm } from '@app/brands/form';
import { Spin } from 'antd';

export default function BrandEdit() {
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
      <BrandForm formProps={formProps} />
    </Edit>
  );
}
