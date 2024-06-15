'use client';

import { Edit, useForm } from '@refinedev/antd';
import React from 'react';
import SupplierForm from '@app/suppliers/form';
import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { useList } from '@refinedev/core';

export default function BrandEdit() {
  const { id } = useParams();
  const { formProps, saveButtonProps, formLoading } = useForm({
    resource: 'users',
    id: id.toString(),
    action: 'edit',
  });

  const { data: products, isLoading } = useList({
    resource: 'products',
    meta: {
      fields: ['_id', 'name'],
    },
  });

  if (formLoading || isLoading) {
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
      <SupplierForm formProps={formProps} products={products.data} />
    </Edit>
  );
}
