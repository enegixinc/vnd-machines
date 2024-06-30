'use client';

import React from 'react';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { ContractForm } from '@app/contracts/form';

export default function ContractsCreate() {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: supplierSelectProps } = useSelect({
    resource: 'users',
    optionLabel: 'fullName',
    filters: [{ field: 'role', operator: 'eq', value: 'supplier' }],
    optionValue: '_id',
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <ContractForm
        formProps={formProps}
        supplierSelectProps={supplierSelectProps}
      />
    </Create>
  );
}
