'use client';

import React from 'react';
import { handleEmptyString } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';

export default function BrandsList() {
  return (
    <QuickTableSection
      pageTitle="Brands"
      resource="brands"
      columns={[
        {
          dataIndex: 'picture',
          title: 'Picture',
          render: handleMagextImage,
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
