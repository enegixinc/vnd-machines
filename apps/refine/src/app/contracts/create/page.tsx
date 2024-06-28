'use client';

import React from 'react';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { ContractForm } from '@app/contracts/form';

export default function ContractsCreate() {
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

  const { selectProps: supplierSelectProps } = useSelect({
    resource: 'users',
    // @ts-ignore
    optionLabel: 'fullName',
    filters: [{ field: 'role', operator: 'eq', value: 'supplier' }],
    optionValue: '_id',
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: 'categories',
    optionLabel: 'fullName',
    optionValue: '_id',
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <ContractForm
        formProps={formProps}
        supplierSelectProps={supplierSelectProps}
        categorySelectProps={categorySelectProps}
      />
    </Create>
  );
}
