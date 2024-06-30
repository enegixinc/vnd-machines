'use client';

import { Edit, useForm } from '@refinedev/antd';
import React from 'react';
import SupplierForm from '@app/suppliers/form';
import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { CanAccess } from '@refinedev/core';

export default function SupplierEdit() {
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
    <CanAccess action="edit" fallback={<div>Unauthorized</div>}>
      <Edit saveButtonProps={saveButtonProps}>
        <SupplierForm formProps={formProps} />
      </Edit>
    </CanAccess>
  );
}
