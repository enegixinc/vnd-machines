'use client';

import { Create, useForm } from '@refinedev/antd';
import React from 'react';
import { PromotionForm } from '@app/promotions/form';

export default function BrandCreate() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <PromotionForm formProps={formProps} />
    </Create>
  );
}
