'use client';

import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Descriptions, Typography } from 'antd';
import React from 'react';
import { SerializedCategoryDto } from '@frontend/api-sdk';
import { safeArrayCounter } from '@helpers';

const { Title } = Typography;

export default function CategoryShow() {
  const { queryResult } = useShow<SerializedCategoryDto>({
    meta: {
      join: [
        {
          field: 'brands',
        },
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

  const record = data?.data;
  if (!record) {
    return null;
  }

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>{'Category Details'}</Title>
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

        {/*<Descriptions.Item label="Category Picture">*/}
        {/*  <ImageField*/}
        {/*    src={record?.}*/}
        {/*    title={record?.name?.en ?? 'logo'}*/}
        {/*    value={defaultSrc}*/}
        {/*  />*/}
        {/*</Descriptions.Item>*/}

        <Descriptions.Item label="Name (English)">
          {/* @ts-ignore */}
          <TextField value={record?.name.ar ?? 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Name (Arabic)">
          {/* @ts-ignore */}
          <TextField value={record?.name.ar ?? 'N/A'} />
        </Descriptions.Item>

        <Descriptions.Item label="Total Sold Products">
          <TextField value={record.totalSoldProducts} />
        </Descriptions.Item>
        <Descriptions.Item label="Total Orders">
          <TextField value={record.totalOrders} />
        </Descriptions.Item>
        <Descriptions.Item label="Total Revenue">
          <TextField value={record.totalRevenue} />
        </Descriptions.Item>

        <Descriptions.Item label="Updated At">
          <TextField value={record.updatedAt} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={record.createdAt} />
        </Descriptions.Item>
        <Descriptions.Item label="Products Count">
          <TextField value={safeArrayCounter(record.products)} />
        </Descriptions.Item>
        <Descriptions.Item label="Products">
          {record.products.map((product) => (
            <TextField key={product.upc} />
          ))}
        </Descriptions.Item>

        <Descriptions.Item label="Brands">
          {record.brands.map((brand) => (
            <TextField key={brand._id} />
          ))}
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
}
