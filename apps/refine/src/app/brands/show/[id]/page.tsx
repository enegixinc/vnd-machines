'use client';

import { ImageField, List, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Descriptions, Divider, Typography } from 'antd';
import React from 'react';
import { SerializedBrandDto } from '@frontend/api-sdk';
import { handleEmptyString, safeArrayCounter } from '@helpers';
import { defaultSrc } from '@app/config';
import { ShowFinance } from '@components/sections/finance';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { QuickTable } from '@components/quick-table';

const { Title } = Typography;

export default function BrandShow() {
  const { queryResult } = useShow<SerializedBrandDto>({
    meta: {
      join: ['products'],
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;
  if (!record) {
    return null;
  }

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>{'Brand Details'}</Title>
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
          <TextField value={record.updatedAt} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={record.createdAt} />
        </Descriptions.Item>
        <Descriptions.Item label="Products Count">
          <TextField value={safeArrayCounter(record.products)} />
        </Descriptions.Item>
        <Descriptions.Item label="Products">
          <QuickTable
            title="Products"
            resource="products"
            columns={[
              {
                dataIndex: 'productPictures',
                title: 'Image',
                render: (productPictures) =>
                  handleMagextImage(productPictures[0]),
              },
              {
                dataIndex: 'fullName',
                title: 'Name',
                sorter: true,
              },
              {
                dataIndex: 'upc',
                title: 'UPC',
                sorter: true,
              },
              {
                dataIndex: 'price',
                title: 'Price',
                sorter: true,
                render: (price) => `${Number(price).toFixed(2)} KD`,
              },
            ]}
          />
        </Descriptions.Item>
      </Descriptions>

      <Divider />
      <ShowFinance record={record} />
    </Show>
  );
}
