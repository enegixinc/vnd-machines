'use client';

import { Edit, useForm } from '@refinedev/antd';
import React from 'react';
import SupplierForm from '@app/suppliers/form';
import { useParams } from 'next/navigation';
import { Spin } from 'antd';

export default function BrandEdit() {
  const { id } = useParams();
  const { formProps, saveButtonProps, formLoading, queryResult } = useForm({
    resource: 'users',
    id: id.toString(),
    action: 'edit',
    meta: {
      join: [
        {
          field: 'products',
          select: ['_id', 'fullName'],
        },
      ],
    },
  });

  console.log(queryResult);
  console.log(formProps);

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
      {/*// @ts-ignore*/}
      <SupplierForm formProps={formProps} />
    </Edit>
  );
}
