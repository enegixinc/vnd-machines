'use client';

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { Space, Table } from 'antd';
import React from 'react';
import { SerializedBrandDto } from '@frontend/api-sdk';
import { defaultSrc } from '@app/config';

export default function BrandsList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      mode: 'server',
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column
          dataIndex="logo"
          title="Logo"
          render={(logo) => <img src={defaultSrc} alt="logo" width={34} />}
        />
        <Table.Column dataIndex={['name', 'en']} title="Name (English)" />
        <Table.Column dataIndex={['name', 'ar']} title="Name (Arabic)" />
        <Table.Column
          dataIndex="totalSoldProducts"
          title="Total Sold Products"
        />
        <Table.Column dataIndex="totalOrders" title="Total Orders" />
        <Table.Column dataIndex="totalRevenue" title="Total Revenue" />
        <Table.Column<SerializedBrandDto>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <ShowButton hideText size="small" recordItemId={record._id} />
              <DeleteButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
