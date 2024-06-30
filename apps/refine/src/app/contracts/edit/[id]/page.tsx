'use client';

import { Edit, useForm, useSelect } from '@refinedev/antd';
import React from 'react';
import SupplierForm from '@app/suppliers/form';
import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { ContractForm } from '@app/contracts/form';

export default function BrandEdit() {
  const { id } = useParams();
  const { formProps, saveButtonProps, formLoading, queryResult } = useForm({
    id: id.toString(),
    action: 'edit',
    meta: {
      join: [
        {
          field: 'supplier',
        },
      ],
    },
  });
  const { selectProps: supplierSelectProps } = useSelect({
    resource: 'users',
    optionLabel: 'fullName',
    filters: [{ field: 'role', operator: 'eq', value: 'supplier' }],
    optionValue: '_id',
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
      {/* @ts-ignore */}
      <ContractForm
        formProps={formProps}
        supplierSelectProps={supplierSelectProps}
      />
    </Edit>
  );
}
