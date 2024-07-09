'use client';

import { Edit, useForm } from '@refinedev/antd';
import React from 'react';
import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import FillRequestForm from '@app/requests/form';

export default function FillRequestEdit() {
  const { id } = useParams();
  const { formProps, saveButtonProps, formLoading, queryResult } = useForm({
    id: id.toString(),
    resource: 'requests',
    redirect: 'list',
    action: 'edit',
    meta: {
      join: [
        {
          field: 'products',
          select: ['_id', 'fullName'],
        },
        {
          field: 'suppliers',
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
      {/*// @ts-ignore*/}
      <FillRequestForm formProps={formProps} />
    </Edit>
  );
}
