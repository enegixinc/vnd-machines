'use client';

import { Edit, useForm } from '@refinedev/antd';
import React from 'react';
import { Spin } from 'antd';
import { EditPromotionForm } from '@app/promotions/edit/[id]/form';

export default function PromotionEdit() {
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
      <EditPromotionForm action={'edit'} formProps={formProps} />
    </Edit>
  );
}
