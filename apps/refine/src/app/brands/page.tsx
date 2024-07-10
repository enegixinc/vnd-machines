'use client';

import React from 'react';
import { formatPrice, handleEmptyString } from '@helpers';
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
          title: 'Sold Products',
          sorter: true,
        },
        {
          dataIndex: 'totalOrders',
          title: 'Orders',
          sorter: true,
        },
        {
          dataIndex: 'totalRevenue',
          title: 'Revenue',
          sorter: true,
          render: formatPrice,
        },
      ]}
    />
  );
}
