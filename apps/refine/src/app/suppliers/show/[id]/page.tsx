'use client';

import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Descriptions, Divider, Typography } from 'antd';
import React from 'react';
import { IUserEntity } from '../../../../../../../libs/core';
import { useParams } from 'next/navigation';
import { ShowFinance } from '@components/sections/finance';
import { formatDate } from '@components/description-dates';

const { Title } = Typography;

export default function SupplierShow() {
  const { id } = useParams();
  const { queryResult } = useShow<IUserEntity>({
    resource: 'users',
    id: id.toString(),
    meta: {
      join: [
        {
          field: 'products',
        },
      ],
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;
  if (!record) {
    return null;
  }

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>{'Supplier Details'}</Title>
      <Descriptions
        bordered
        column={1}
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="ID">
          <TextField value={record._id} />
        </Descriptions.Item>
        <Descriptions.Item label="First Name">
          <TextField value={record.firstName} />
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          <TextField value={record.lastName} />
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <TextField value={record.email} />
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          <TextField value={record.phoneNumber} />
        </Descriptions.Item>
        <Descriptions.Item label="Business Name">
          <TextField value={record.businessName || 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Active">
          <TextField value={record.active ? 'Yes' : 'No'} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={formatDate(record.createdAt)} />
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          <TextField value={formatDate(record.updatedAt)} />
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <ShowFinance record={record} />
    </Show>
  );
}
