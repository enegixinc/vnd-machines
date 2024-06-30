'use client';

import { Show, TextField } from '@refinedev/antd';
import { Descriptions, Divider, Space, Table, Typography } from 'antd';
import React from 'react';
import { CanAccess, useShow } from '@refinedev/core';
import { handleEmptyString } from '@helpers';

import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { handleNullableText } from '@app/products/utils/handleNullableText';
import { formatDate } from '@components/description-dates';

const { Title } = Typography;

export default function OrderShow() {
  const { queryResult } = useShow({
    meta: {
      join: [
        {
          field: 'products',
        },
        {
          field: 'products.product',
        },
        {
          field: 'products.product.supplier',
        },
        {
          field: 'products.product.category',
        },
        {
          field: 'products.product.brand',
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
    <CanAccess action="show" fallback={<div>Unauthorized</div>}>
      <Show isLoading={isLoading}>
        <Title level={3}>{'Order Details'}</Title>
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
          <Descriptions.Item label="Status">
            <TextField value={handleEmptyString(record.status)} />
          </Descriptions.Item>
          <Descriptions.Item label="Payment Type">
            <TextField value={handleEmptyString(record.payment_type)} />
          </Descriptions.Item>
          <Descriptions.Item label="Total">
            <TextField
              value={`${Number(record.total).toFixed(2)} ${record.currency}`}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Cart Number">
            <TextField value={handleEmptyString(record.cart_number)} />
          </Descriptions.Item>
          <Descriptions.Item label="Total Quantity">
            <TextField value={record.totalQuantity} />
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            <TextField value={formatDate(record.createdAt)} />
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            <TextField value={formatDate(record.updatedAt)} />
          </Descriptions.Item>
        </Descriptions>

        <Divider />
        <Title level={3} style={{ marginTop: 16 }}>
          {'Products'}
        </Title>

        <Table
          dataSource={record.products}
          columns={[
            {
              title: 'Basic Info',
              children: [
                {
                  dataIndex: ['product', 'productPictures'],
                  title: 'Image',
                  render: (productPictures) =>
                    handleMagextImage(
                      productPictures ? productPictures[0] : ''
                    ),
                },
                {
                  dataIndex: ['product', 'fullName'],
                  title: 'Name',
                  sorter: true,
                  render: handleNullableText,
                },
                {
                  dataIndex: ['product', 'upc'],
                  title: 'UPC',
                  sorter: true,
                  render: handleNullableText,
                },
                {
                  dataIndex: ['product', 'price'],
                  title: 'Price',
                  sorter: true,
                  render: (price) => `${Number(price).toFixed(2)} KD`,
                },
              ],
            },
            {
              title: 'Associations',
              children: [
                {
                  dataIndex: ['product', 'supplier', 'fullName'],
                  title: 'Supplier',
                  render: handleEmptyString,
                  onFilter(value, record) {
                    return record.supplier === null;
                  },
                  filters: [
                    {
                      text: 'No Supplier',
                      value: 'null',
                    },
                  ],
                },
                {
                  dataIndex: ['product', 'category', 'fullName'],
                  title: 'Category',
                  render: handleEmptyString,
                },
                {
                  dataIndex: ['product', 'brand', 'fullName'],
                  title: 'Brand',
                  render: handleEmptyString,
                },
              ],
            },
            {
              title: 'Extra Details',
              render: (_, __, index) =>
                index === 0 && <Divider>Position</Divider>,
              children: [
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
              ],
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
          <Descriptions.Item label="Payment Transaction ID">
            <TextField
              value={handleEmptyString(record.payment_transaction_id)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Payment Receipt">
            <TextField value={handleEmptyString(record.payment_receipt)} />
          </Descriptions.Item>
          <Descriptions.Item label="Card Number">
            <TextField value={handleEmptyString(record.card_number)} />
          </Descriptions.Item>
          <Descriptions.Item label="Card Department">
            <TextField value={handleEmptyString(record.card_department)} />
          </Descriptions.Item>
          <Descriptions.Item label="Reservation Code">
            <TextField value={handleEmptyString(record.reservation_code)} />
          </Descriptions.Item>
          <Descriptions.Item label="Return Code">
            <TextField value={handleEmptyString(record.return_code)} />
          </Descriptions.Item>
        </Descriptions>
      </Show>
    </CanAccess>
  );
}
