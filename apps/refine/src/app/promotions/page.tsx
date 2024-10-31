'use client';

import React from 'react';
import { formatPrice, handleEmptyString } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';

export default function PromotionsList() {
  return (
    <QuickTableSection
      pageTitle="Promotions"
      resource="Promotions"
      columns={[
        {
          dataIndex: 'title',
          title: 'Promotion Title',
          render: handleEmptyString,
        },
        {
          dataIndex: 'code',
          title: 'Code',
          render: handleEmptyString,
        },
        {
          dataIndex: 'amount',
          title: 'Discount Amount',
          render: formatPrice,
          sorter: true,
        },
        {
          dataIndex: 'startDate',
          title: 'Start Date',
          render: (date) => new Date(date).toLocaleDateString(),
        },
        {
          dataIndex: 'endDate',
          title: 'End Date',
          render: (date) => new Date(date).toLocaleDateString(),
        },
        {
          dataIndex: 'active',
          title: 'Active',
          render: (active) => (active ? 'Yes' : 'No'),
        },
      ]}
    />
  );
}
