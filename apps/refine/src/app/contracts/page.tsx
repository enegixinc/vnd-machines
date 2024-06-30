'use client';

import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';
import { TextField } from '@refinedev/antd';
import { ContractStatus } from '@core';
import { handleNullableText } from '@app/products/utils/handleNullableText';
import { useRouter } from 'next/navigation';

export default function ContractsList() {
  const router = useRouter();
  return (
    <QuickTableSection
      pageTitle="Contracts"
      resource="contracts"
      meta={{
        join: [
          {
            field: 'supplier',
          },
        ],
      }}
      columns={[
        {
          title: 'Contract Details',
          children: [
            {
              dataIndex: 'startDate',
              title: 'Start Date',
              sorter: true,
            },
            {
              dataIndex: 'endDate',
              title: 'End Date',
              sorter: true,
            },
            {
              dataIndex: 'description',
              title: 'Description',
              render: handleNullableText,
            },
            {
              dataIndex: 'status',
              title: 'Status',
              render: (status) => (
                <TextField
                  value={
                    status === ContractStatus.ACTIVE ? 'Active' : 'Inactive'
                  }
                  style={{
                    color: status === ContractStatus.ACTIVE ? 'green' : 'red',
                  }}
                />
              ),
            },
          ],
        },
        {
          title: 'Financial Details',
          children: [
            {
              dataIndex: 'feePerSale',
              title: 'Fee Per Sale',
              sorter: true,
            },
            {
              dataIndex: 'feeType',
              title: 'Fee Type',
            },
            {
              dataIndex: 'totalRevenue',
              title: 'Total Revenue',
              sorter: true,
              render: (totalRevenue) => `${Number(totalRevenue).toFixed(2)} KD`,
            },
          ],
        },
        {
          title: 'Supplier Information',
          children: [
            {
              dataIndex: ['supplier', 'fullName'],
              title: 'Supplier Name',
              onCell: (record) => ({
                style: { cursor: 'pointer', color: '#1890ff' },
                onClick: () =>
                  router.push(`/suppliers/show/${record.supplier._id}`),
              }),
            },
            {
              dataIndex: ['supplier', 'email'],
              title: 'Supplier Email',
            },
          ],
        },
      ]}
    />
  );
}
