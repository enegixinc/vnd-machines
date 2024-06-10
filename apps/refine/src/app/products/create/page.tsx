'use client';

import { Create, useForm, useSelect } from '@refinedev/antd';
import React from 'react';
import { ProductForm } from '@app/products/form';

export default function ProductCreate() {
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: brandSelectProps } = useSelect({
    resource: 'brands',
    optionLabel: 'name.en',
    optionValue: '_id',
  });
  const { selectProps: supplierSelectProps } = useSelect({
    resource: 'users',
    // @ts-ignore
    optionLabel: 'email',
    filters: [{ field: 'role', operator: 'eq', value: 'supplier' }],
    optionValue: '_id',
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: 'categories',
    optionLabel: 'name.en',
    optionValue: '_id',
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <ProductForm
        formProps={formProps}
        brandSelectProps={brandSelectProps}
        supplierSelectProps={supplierSelectProps}
        categorySelectProps={categorySelectProps}
      />
    </Create>
  );
}
