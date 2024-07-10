'use client';

import { Create, useForm } from '@refinedev/antd';
import React from 'react';
import { ProductForm } from '@app/products/form';
import { useGetIdentity } from '@refinedev/core';
import { IUserEntity, UserRole } from '@core';
import { Spin } from 'antd';

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
  const { data: currentUser, isLoading } = useGetIdentity<IUserEntity>();
  const isSupplier = currentUser?.role === UserRole.SUPPLIER;
  if (isSupplier) {
    formProps.initialValues = {
      ...formProps.initialValues,
      supplier: {
        _id: currentUser._id,
        fullName: currentUser.fullName,
      },
    };
  }

  if (isLoading) {
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
    <Create saveButtonProps={saveButtonProps}>
      <ProductForm
        action="create"
        isSupplier={isSupplier}
        formProps={formProps}
      />
    </Create>
  );
}
