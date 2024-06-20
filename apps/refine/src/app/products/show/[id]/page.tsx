'use client';

import { Show, TextField } from '@refinedev/antd';
import { Descriptions, Divider, Typography } from 'antd';
import React from 'react';
import { SerializedProductDto } from '@frontend/api-sdk';
import { useShow } from '@refinedev/core';
import { handleProductImage } from '@app/products/page';
import { handleEmptyString } from '@helpers';

const { Title } = Typography;

export default function ProductShow() {
  const { queryResult } = useShow<SerializedProductDto>({
    meta: {
      join: [
        {
          field: 'category',
        },
        {
          field: 'brand',
        },
        {
          field: 'supplier',
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
      <Title level={3}>{'Product Details'}</Title>
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

        <Descriptions.Item label="Image">
          {handleProductImage(record.productPictures)}
        </Descriptions.Item>

        <Descriptions.Item label="Name (English)">
          <TextField value={handleEmptyString(record.name.en)} />
        </Descriptions.Item>
        <Descriptions.Item label="Name (Arabic)">
          <TextField value={handleEmptyString(record.name.ar)} />
        </Descriptions.Item>

        <Descriptions.Item label="UPC">
          <TextField value={record.upc} />
        </Descriptions.Item>
        <Descriptions.Item label="Barcode">
          <TextField value={record.barcode} />
        </Descriptions.Item>

        <Descriptions.Item label="Price">
          <TextField value={`${Number(record.price).toFixed(2)} KD`} />
        </Descriptions.Item>
        <Descriptions.Item label="Cost Price">
          <TextField value={`${Number(record.costPrice).toFixed(2)} KD`} />
        </Descriptions.Item>
        <Descriptions.Item label="Additional Price">
          <TextField value={`${Number(record.additionPrice).toFixed(2)} KD`} />
        </Descriptions.Item>

        <Descriptions.Item label="Age Control">
          <TextField value={record.ageControl} />
        </Descriptions.Item>

        <Descriptions.Item label="Updated At">
          <TextField value={record.updatedAt} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={record.createdAt} />
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Title level={3} style={{ marginTop: 16 }}>
        {'Associations'}
      </Title>
      <Descriptions
        bordered
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="Supplier">
          <TextField value={handleEmptyString(record.supplier?.fullName)} />
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          <TextField value={handleEmptyString(record.category?.name?.en)} />
        </Descriptions.Item>
        <Descriptions.Item label="Brand">
          <TextField value={handleEmptyString(record.brand?.name?.en)} />
        </Descriptions.Item>
      </Descriptions>

      <Divider />
      <Title level={3} style={{ marginTop: 16 }}>
        {'Finance'}
      </Title>
      <Descriptions
        bordered
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="Total Orders">
          <TextField value={record.totalOrders} />
        </Descriptions.Item>
        <Descriptions.Item label="Total Products Sold">
          <TextField value={record.totalSoldProducts} />
        </Descriptions.Item>
        <Descriptions.Item label="Total Revenue">
          <TextField value={record.totalRevenue} />
        </Descriptions.Item>
      </Descriptions>
      <Divider />

      <Title level={3} style={{ marginTop: 16 }}>
        {'Extra Details'}
      </Title>
      <Descriptions
        bordered
        column={2}
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="Description (English)">
          <TextField value={handleEmptyString(record.description?.en)} />
        </Descriptions.Item>
        <Descriptions.Item label="Description (Arabic)">
          <TextField value={handleEmptyString(record.description?.ar)} />
        </Descriptions.Item>
        <Descriptions.Item label="Detail (English)">
          <TextField value={handleEmptyString(record.detail?.en)} />
        </Descriptions.Item>
        <Descriptions.Item label="Detail (Arabic)">
          <TextField value={handleEmptyString(record.detail?.ar)} />
        </Descriptions.Item>
        <Descriptions.Item label="Include (English)">
          <TextField value={handleEmptyString(record.include?.en)} />
        </Descriptions.Item>
        <Descriptions.Item label="Include (Arabic)">
          <TextField value={handleEmptyString(record.include?.ar)} />
        </Descriptions.Item>
        <Descriptions.Item label="Ingredients (English)">
          <TextField value={handleEmptyString(record.ingredients?.en)} />
        </Descriptions.Item>
        <Descriptions.Item label="Ingredients (Arabic)">
          <TextField value={handleEmptyString(record.ingredients?.ar)} />
        </Descriptions.Item>
        <Descriptions.Item label="Key Features (English)">
          <TextField value={handleEmptyString(record.keyFeatures?.en)} />
        </Descriptions.Item>
        <Descriptions.Item label="Key Features (Arabic)">
          <TextField value={handleEmptyString(record.keyFeatures?.ar)} />
        </Descriptions.Item>
        <Descriptions.Item label="Specification (English)">
          <TextField value={handleEmptyString(record.specification?.en)} />
        </Descriptions.Item>
        <Descriptions.Item label="Specification (Arabic)">
          <TextField value={handleEmptyString(record.specification?.ar)} />
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
}
