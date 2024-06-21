'use client';

import React from 'react';
import { defaultSrc } from '@app/config';
import { handleEmptyString } from '@helpers';
import { QuickTable } from '@components/quick-table';

export default function CategoriesList() {
  return (
    <QuickTable
      title="Categories"
      resource="categories"
      columns={[
        {
          dataIndex: 'logo',
          title: 'Logo',
          render: (logo) => <img src={defaultSrc} alt="logo" width={34} />,
        },
        {
          dataIndex: ['name', 'en'],
          title: 'Name (English)',
          render: handleEmptyString,
        },
        {
          dataIndex: ['name', 'ar'],
          title: 'Name (Arabic)',
          render: handleEmptyString,
        },
        {
          dataIndex: 'totalSoldProducts',
          title: 'Total Sold Products',
          sorter: true,
        },
        {
          dataIndex: 'totalOrders',
          title: 'Total Orders',
          sorter: true,
        },
        {
          dataIndex: 'totalRevenue',
          title: 'Total Revenue',
          sorter: true,
        },
      ]}
    />
  );
}
