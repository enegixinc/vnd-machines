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
import { SerializedCategoryDto } from '@frontend/api-sdk';
import { defaultSrc } from '@app/config';
import { handleEmptyString } from '@helpers';

export default function CategoriesList() {
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
        <Table.Column
          dataIndex={['name', 'en']}
          title="Name (English)"
          render={handleEmptyString}
        />
        <Table.Column
          dataIndex={['name', 'ar']}
          title="Name (Arabic)"
          render={handleEmptyString}
        />
        <Table.Column
          dataIndex="totalSoldProducts"
          title="Total Sold Products"
          sorter={true}
        />
        <Table.Column
          dataIndex="totalOrders"
          title="Total Orders"
          sorter={true}
        />
        <Table.Column
          dataIndex="totalRevenue"
          title="Total Revenue"
          sorter={true}
        />
        <Table.Column<SerializedCategoryDto>
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
