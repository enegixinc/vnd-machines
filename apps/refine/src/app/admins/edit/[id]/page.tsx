'use client';

import { Edit, useForm } from '@refinedev/antd';
import React from 'react';
import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { CanAccess, useGo } from '@refinedev/core';
import AdminForm from '@app/admins/form';

export default function AdminEdit() {
  const { id } = useParams();
  const go = useGo();
  const { formProps, saveButtonProps, formLoading } = useForm({
    resource: 'users',
    redirect: false,
    onMutationSuccess: () => {
      go({ to: '/admins' });
    },
    id: id.toString(),
    action: 'edit',
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
        <AdminForm action="edit" formProps={formProps} />
      </Edit>
    </CanAccess>
  );
}
