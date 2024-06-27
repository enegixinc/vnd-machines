'use client';

import React from 'react';
import { defaultSrc } from '@app/config';
import { handleEmptyString } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';

export default function CategoriesList() {
  return (
    <QuickTableSection
      pageTitle="Categories"
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
