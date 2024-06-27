'use client';

import { Create, useForm } from '@refinedev/antd';
import React, { useState } from 'react';
import { UserEntity } from '@frontend/api-sdk';
import RequestsForm from '@app/requests/form';

export default function SupplierCreate() {
  const { formProps, saveButtonProps } = useForm<UserEntity>({
    resource: 'requests',
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <RequestsForm formProps={formProps} />
    </Create>
  );
}
