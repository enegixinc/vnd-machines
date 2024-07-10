'use client';

import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';
import { handleNullableText } from '@app/products/utils/handleNullableText';
import { formatTime } from '@helpers';
import { useGetIdentity } from '@refinedev/core';
import { IUserEntity } from '@core';

export default function FillRequestsList() {
  const userRole = useGetIdentity<IUserEntity>()?.data?.role;
  const supplierId = useGetIdentity<IUserEntity>()?.data?._id;

  return (
    <>
      <QuickTableSection
        pageTitle="Requests"
        resource="requests"
        showEdit={false}
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
            render: handleNullableText,
          },
          {
            title: 'Products',
            dataIndex: 'products',
            render: (products) => products.length,
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: formatTime,
          },
        ]}
      />
    </>
  );
}
