'use client';

import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';
import { TextField } from '@refinedev/antd';
import { ContractStatus } from '@core';
import { handleNullableText } from '@app/products/utils/handleNullableText';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@helpers';

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
                    status === ContractStatus.ACTIVE
                      ? 'Active'
                      : status === ContractStatus.EXPIRED
                      ? 'Expired'
                      : 'Terminated'
                  }
                  style={{
                    color:
                      status === ContractStatus.ACTIVE
                        ? '#52c41a'
                        : status === ContractStatus.EXPIRED
                        ? '#f5222d'
                        : '#faad14',
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
              title: 'Fee',
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
              render: formatPrice,
            },
            {
              dataIndex: 'activeRevenue',
              title: 'Active Revenue',
              sorter: true,
              render: formatPrice,
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
