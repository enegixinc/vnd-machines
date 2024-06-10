'use client';

import { Show, TextField } from '@refinedev/antd';
import { Descriptions, Typography } from 'antd';
import React from 'react';
import { SerializedProductDto } from '@frontend/api-sdk';
import { useShow } from '@refinedev/core';
import { handleProductImage } from '@app/products/page';

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
          <TextField value={record.name.en ?? 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Name (Arabic)">
          <TextField value={record.name.ar ?? 'N/A'} />
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

        <Descriptions.Item label="Supplier">
          <TextField value={record.supplier?.email ?? 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          <TextField value={record.category?.name?.en ?? 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Brand">
          <TextField value={record.brand?.name?.en ?? 'N/A'} />
        </Descriptions.Item>

        <Descriptions.Item label="Total Orders">
          <TextField value={record.totalOrders} />
        </Descriptions.Item>
        <Descriptions.Item label="Total Products Sold">
          <TextField value={record.totalSoldProducts} />
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
      </Descriptions>

      <Title level={4} style={{ marginTop: 16 }}>
        {'Product Descriptions'}
      </Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Description">
          <TextField value={record.description?.en ?? 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Detail">
          <TextField value={record.detail?.en ?? 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Include">
          <TextField value={record.include?.en ?? 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Ingredients">
          <TextField value={record.ingredients?.en ?? 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Key Features">
          <TextField value={record.keyFeatures?.en ?? 'N/A'} />
        </Descriptions.Item>
        <Descriptions.Item label="Specification">
          <TextField value={record.specification?.en ?? 'N/A'} />
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
}
