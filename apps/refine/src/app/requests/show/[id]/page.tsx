'use client';

import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Descriptions, Divider, Typography } from 'antd';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShowFinance } from '@components/sections/finance';
import { handleNullableText } from '@app/products/utils/handleNullableText';
import { DescriptionDates, formatDate } from '@components/description-dates';

const { Title } = Typography;

export default function FillRequestShow() {
  const { id } = useParams();
  const { queryResult } = useShow({
    resource: 'requests',
    id: id.toString(),
    meta: {
      join: [
        {
          field: 'machine',
        },
        {
          field: 'products',
          select: ['product', 'quantity'],
          join: [
            {
              field: 'product',
            },
          ],
        },
      ],
    },
  });
  const { data, isLoading } = queryResult;

  const router = useRouter();
  const record = data?.data;
  if (!record) {
    return null;
  }

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>{'Fill Request Details'}</Title>
      <Descriptions
        bordered
        column={2}
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="Machine Name">
          <TextField
            style={{
              color: '#1890ff',
              cursor: 'pointer',
            }}
            onClick={() => {
              router.push(`/machines/show/${record.machine?._id}`);
            }}
            value={record.machine?.description}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Notes">
          <TextField value={handleNullableText(record.notes)} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={formatDate(record.createdAt)} />
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          <TextField value={formatDate(record.updatedAt)} />
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </Show>
  );
}
