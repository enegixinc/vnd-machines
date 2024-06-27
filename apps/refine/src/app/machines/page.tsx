'use client';

import { Tag } from 'antd';
import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';

export default function FillRequestsList() {
  return (
    <>
      <QuickTableSection
        pageTitle="Fill Requests"
        resource={'requests'}
        meta={{
          join: [
            {
              field: 'products',
            },
            {
              field: 'machine',
            },
            {
              field: 'products.product',
            },
          ],
        }}
        columns={[
          {
            title: 'Machine',
            dataIndex: ['machine', 'description'],
          },
          {
            title: 'Notes',
            dataIndex: 'notes',
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (createdAt) => new Date(createdAt).toLocaleDateString(),
          },
        ]}
      />
    </>
  );
}
