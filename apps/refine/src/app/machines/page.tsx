'use client';

import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';
import { TextField } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { formatPrice } from '@helpers';

export default function MachinesList() {
  const go = useGo();
  return (
    <QuickTableSection
      pageTitle="Machines"
      resource="machines"
      showActions={false}
      canCreate={false}
      onRow={(record) => ({
        onClick: () => {
          go({ to: `/machines/show/${record._id}` });
        },
        style: { cursor: 'pointer' },
      })}
      columns={[
        {
          title: 'Machine Info',
          children: [
            {
              dataIndex: 'fullName',
              title: 'Name',
              sorter: true,
            },
            {
              dataIndex: 'description',
              title: 'Description',
            },
            {
              dataIndex: 'machineOnline',
              title: 'Status',
              render: (machineOnline) => (
                <TextField
                  value={machineOnline ? 'Online' : 'Offline'}
                  style={{
                    color: machineOnline ? 'green' : 'red',
                  }}
                />
              ),
            },
          ],
        },
        {
          title: 'Stock Info',
          children: [
            {
              dataIndex: 'productsCount',
              title: 'Products Count',
              sorter: true,
            },
            {
              dataIndex: 'fill',
              title: 'Fill',
              sorter: true,
            },
          ],
        },
        {
          title: 'Finance',
          children: [
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
              dataIndex: 'totalSales',
              title: 'Revenue',
              sorter: true,
              render: formatPrice,
            },
            {
              dataIndex: 'totalActiveRevenue',
              title: 'Active Revenue',
              sorter: true,
              render: formatPrice,
            },
          ],
        },
      ]}
    />
  );
}
