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
import { handleEmptyString } from '@helpers';

export default function SuppliersList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: 'users',
    permanentFilter: [
      {
        field: 'role',
        operator: 'eq',
        value: 'supplier',
      },
    ],
    sorters: {
      mode: 'server',
    },
    filters: {
      mode: 'server',
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column
          title="First Name"
          dataIndex="firstName"
          render={handleEmptyString}
        />
        <Table.Column
          title="Last Name"
          dataIndex="lastName"
          render={handleEmptyString}
        />
        <Table.Column
          title="Email"
          dataIndex="email"
          render={handleEmptyString}
        />
        <Table.Column
          title="Phone Number"
          dataIndex="phoneNumber"
          render={handleEmptyString}
        />
        <Table.Column
          title="Business Name"
          dataIndex="businessName"
          render={handleEmptyString}
        />
        <Table.Column
          title="Active"
          dataIndex="active"
          render={(active) => (active ? 'Yes' : 'No')}
        />
        <Table.Column
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
