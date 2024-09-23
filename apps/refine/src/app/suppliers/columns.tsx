import { handleEmptyString } from '@helpers';
import { Tag } from 'antd';
import { ColumnType } from 'antd/es/table';
import { BaseRecord } from '@refinedev/core';

export const supplierColumns: ColumnType<BaseRecord>[] = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    render: handleEmptyString,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    render: handleEmptyString,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: handleEmptyString,
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    render: handleEmptyString,
  },
  {
    title: 'Business Name',
    dataIndex: 'businessName',
    render: handleEmptyString,
  },
  {
    title: 'Active',
    dataIndex: 'active',
    render: (active) =>
      active ? (
        <Tag color="green">Active</Tag>
      ) : (
        <Tag color="red">Inactive</Tag>
      ),
  },
];
