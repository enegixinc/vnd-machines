'use client';

import { Show, TextField } from '@refinedev/antd';
import { CanAccess, useShow } from '@refinedev/core';
import { Descriptions, Typography } from 'antd';
import React from 'react';
import { IUserEntity } from '@core';
import { useParams } from 'next/navigation';
import { formatDate } from '@components/description-dates';
import { handleNullableText } from '@app/products/utils/handleNullableText';

const { Title } = Typography;

export default function SupplierShow() {
  const { id } = useParams();
  const { queryResult } = useShow<IUserEntity>({
    resource: 'users',
    id: id.toString(),
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;
  if (!record) {
    return null;
  }

  return (
    <CanAccess action="show" fallback={<div>Unauthorized</div>}>
      <Show isLoading={isLoading}>
        <Title level={3}>{'Admin Details'}</Title>
        <Descriptions
          bordered
          column={2}
          labelStyle={{
            fontWeight: 'bold',
            width: '20%',
          }}
        >
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
            <TextField value={handleNullableText(record.phoneNumber)} />
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            <TextField value={formatDate(record.createdAt)} />
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            <TextField value={formatDate(record.updatedAt)} />
          </Descriptions.Item>
        </Descriptions>
      </Show>
    </CanAccess>
  );
}
