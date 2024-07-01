'use client';

import { Show, TextField } from '@refinedev/antd';
import { Descriptions, Divider, Table, Typography } from 'antd';
import React from 'react';
import { SerializedProductDto } from '@frontend/api-sdk';
import { useShow } from '@refinedev/core';
import { handleEmptyString } from '@helpers';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { ShowFinance } from '@components/sections/finance';
import { useRouter } from 'next/navigation';
import { formatDate } from '@components/description-dates';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const { Title } = Typography;
dayjs.extend(relativeTime);

export default function ProductShow() {
  const router = useRouter();
  const { queryResult } = useShow<SerializedProductDto>({
    meta: {
      join: [
        {
          field: 'category',
          select: ['_id', 'fullName'],
        },
        {
          field: 'brand',
          select: ['_id', 'fullName'],
        },
        {
          field: 'supplier',
          select: ['_id', 'fullName'],
        },
        {
          field: 'orders',
        },
        {
          field: 'orders.machine',
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
        <Descriptions.Item label="Image">
          {handleMagextImage(record.productPictures[0])}
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

        <Descriptions.Item label="Price Per Kilo">
          <TextField value={`${Number(record.pricePerKilo).toFixed(2)} KD`} />
        </Descriptions.Item>

        <Descriptions.Item label="Age Control">
          <TextField value={record.ageControl} />
        </Descriptions.Item>

        <Descriptions.Item label="Updated At">
          <TextField value={formatDate(record.updatedAt)} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={formatDate(record.createdAt)} />
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
          <TextField
            onClick={() =>
              record.supplier?._id &&
              router.push(`/suppliers/show/${record.supplier?._id}`)
            }
            style={{
              cursor: record.supplier?._id && 'pointer',
              color: record.supplier?._id && '#1890ff',
            }}
            value={handleEmptyString(record.supplier?.fullName)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          <TextField
            onClick={() =>
              record.category?._id &&
              router.push(`/categories/show/${record.category?._id}`)
            }
            style={{
              cursor: record.category?._id && 'pointer',
              color: record.category?._id && '#1890ff',
            }}
            value={handleEmptyString(record.category?.fullName)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Brand">
          <TextField
            onClick={() =>
              record.brand?._id &&
              router.push(`/brands/show/${record.brand?._id}`)
            }
            style={{
              cursor: record.brand?._id && 'pointer',
              color: record.brand?._id && '#1890ff',
            }}
            value={handleEmptyString(record.brand?.fullName)}
          />
        </Descriptions.Item>
      </Descriptions>

      <Divider />
      <ShowFinance record={record} />
      <Divider />
      <Title level={3} style={{ marginTop: 16 }}>
        {'Orders'}
      </Title>
      <Table
        dataSource={record.orders}
        onRow={(record) => {
          return {
            onClick: () => {
              console.log('record', record);
              router.push(`/orders/show/${record.order_id}`);
            },
            style: { cursor: 'pointer' },
          };
        }}
        columns={[
          {
            title: 'Discount',
            dataIndex: 'discount',
            sorter: true,
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
            sorter: true,
          },
          {
            dataIndex: 'lane',
            title: 'Lane',
            sorter: true,
          },
          {
            dataIndex: 'row_number',
            title: 'Row',
            sorter: true,
          },
          {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (date) => dayjs(date).fromNow(),
          },
        ]}
        loading={isLoading}
        showSorterTooltip
        rowKey="_id"
      />

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
