'use client';

import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';
import { Divider } from 'antd';
import { TextField } from '@refinedev/antd';

export default function MachinesList() {
  return (
    <QuickTableSection
      pageTitle="Machines"
      resource="machines"
      meta={{
        join: [
          {
            field: 'product',
          },
        ],
      }}
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
              dataIndex: 'stock',
              title: 'Stock',
              sorter: true,
            },
            {
              dataIndex: 'productsCount',
              title: 'Products Count',
              sorter: true,
            },
          ],
        },
        {
          title: 'Finance',
          children: [
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
              render: (totalRevenue) => `${Number(totalRevenue).toFixed(2)} KD`,
            },
          ],
        },
      ]}
    />
  );
}
