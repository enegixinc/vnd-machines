'use client';

import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Descriptions, Divider, Spin, Typography } from 'antd';
import React from 'react';
import { SerializedCategoryDto } from '@frontend/api-sdk';
import { ShowFinance } from '@components/sections/finance';
import { JoinedProductsTable } from '@components/joined-products.table';
import { JoinedOrdersTable } from '@components/joined-orders.table';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';

const { Title } = Typography;

export default function CategoryShow() {
  const { queryResult } = useShow<SerializedCategoryDto>({
    meta: {
      join: [
        {
          field: 'suppliers',
        },
        {
          field: 'products',
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
      <Title level={3}>{'Category Details'}</Title>
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

        <Descriptions.Item label="Category Picture">
          {handleMagextImage(record.categoryPicture)}
        </Descriptions.Item>

        <Descriptions.Item label="Name (English)">
          {/* @ts-ignore */}
          <TextField value={record?.name.ar ?? 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Name (Arabic)">
          {/* @ts-ignore */}
          <TextField value={record?.name.ar ?? 'N/A'} />
        </Descriptions.Item>

        <Descriptions.Item label="Updated At">
          <TextField value={record.updatedAt} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={record.createdAt} />
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <ShowFinance record={record} />
      <Divider />
      <JoinedProductsTable record={record} />
      <Divider />
      <JoinedOrdersTable
        useTableProps={{
          meta: {
            join: [
              {
                field: 'machine',
              },
              {
                field: 'products',
              },
              {
                field: 'products.product',
              },
            ],
          },
          filters: {
            permanent: [
              {
                field: `products.product.category_id`,
                operator: 'eq',
                value: record._id,
              },
            ],
          },
        }}
      />
    </Show>
  );
}
