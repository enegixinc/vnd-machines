'use client';

import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Descriptions, Typography } from 'antd';
import React from 'react';
import { SharedUserDto } from './types'; // Assuming you have a types file

const { Title } = Typography;

export default function SupplierShow() {
  const { queryResult } = useShow<SharedUserDto>();
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
          <TextField value={record.createdAt} />
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          <TextField value={record.updatedAt} />
        </Descriptions.Item>
        {record.deletedAt && (
          <Descriptions.Item label="Deleted At">
            <TextField value={record.deletedAt} />
          </Descriptions.Item>
        )}
        {record.lastSyncAt && (
          <Descriptions.Item label="Last Sync At">
            <TextField value={record.lastSyncAt} />
          </Descriptions.Item>
        )}
      </Descriptions>
    </Show>
  );
}
