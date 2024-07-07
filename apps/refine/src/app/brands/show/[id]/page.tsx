'use client';

import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Descriptions, Divider, Spin, Typography } from 'antd';
import React from 'react';
import { SerializedBrandDto } from '@frontend/api-sdk';
import { handleEmptyString } from '@helpers';
import { ShowFinance } from '@components/sections/finance';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { formatDate } from '@components/description-dates';
import { JoinedProductsTable } from '@components/joined-products.table';
import { JoinedOrdersTable } from '@components/joined-orders.table';

const { Title } = Typography;

export default function BrandShow() {
  const { queryResult } = useShow<SerializedBrandDto>({
    meta: {
      join: [
        {
          field: 'products',
        },
        {
          field: 'supplier',
        },
        {
          field: 'orders',
        },
      ],
    },
  });
  const { data, isLoading } = queryResult;
  if (isLoading) {
    return (
      <Spin
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }
  const record = data?.data;
  if (!record) {
    return null;
  }

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>{'Brand Details'}</Title>
      <Descriptions
        bordered
        column={2}
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="ID">
          <TextField value={record._id} />
        </Descriptions.Item>

        <Descriptions.Item label="Brand Picture">
          {handleMagextImage(record.logo)}
        </Descriptions.Item>

        <Descriptions.Item label="Name (English)">
          {/* @ts-ignore */}
          <TextField value={handleEmptyString(record?.name.en)} />
        </Descriptions.Item>
        <Descriptions.Item label="Name (Arabic)">
          {/* @ts-ignore */}
          <TextField value={handleEmptyString(record?.name.ar)} />
        </Descriptions.Item>

        <Descriptions.Item label="Updated At">
          <TextField value={formatDate(record.updatedAt)} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={formatDate(record.createdAt)} />
        </Descriptions.Item>
      </Descriptions>

      <Divider />
      <ShowFinance record={record} />
      <Divider />
      <JoinedProductsTable record={record} />

      <Divider />
      <JoinedOrdersTable record={record} />
    </Show>
  );
}
