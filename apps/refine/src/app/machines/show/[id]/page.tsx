'use client';

import { Show, TextField } from '@refinedev/antd';
import { Descriptions, Divider, Space, Table, Typography } from 'antd';
import React from 'react';
import { useShow } from '@refinedev/core';
import { handleEmptyString } from '@helpers';

import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { handleNullableText } from '@app/products/utils/handleNullableText';

const { Title } = Typography;

export default function MachineShow() {
  const { queryResult } = useShow({
    meta: {
      join: [
        {
          field: 'product',
        },
        {
          field: 'orders',
        },
        {
          field: 'product.product',
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
      <Title level={3}>{'Machine'}</Title>
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
          <TextField
            value={record.machineOnline ? 'Online' : 'Offline'}
            style={{
              color: record.machineOnline ? 'green' : 'red',
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={record.createdAt} />
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          <TextField value={record.updatedAt} />
        </Descriptions.Item>
        <Descriptions.Item label="Alert Email">
          <Space direction={'vertical'}>
            {record.alertEmail.split(',').map((email) => (
              <TextField key={email} value={email} />
            ))}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Lane">
          <TextField value={record.lane} />
        </Descriptions.Item>
        <Descriptions.Item label="Floor">
          <TextField value={record.floor} />
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

      <Divider />
      <Title level={3} style={{ marginTop: 16 }}>
        {'Products'}
      </Title>

      <Table
        dataSource={record.product}
        columns={[
          {
            title: 'Basic Info',
            render: (_, __, index) =>
              index === 0 && <Divider>Basic Info</Divider>,
            children: [
              {
                dataIndex: ['product', 'productPictures'],
                title: 'Image',
                render: (productPictures) =>
                  handleMagextImage(productPictures[0]),
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
                render: (price) => `${Number(price).toFixed(2)} USD`,
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
                title: 'Current Stock',
                dataIndex: 'current_stock',
                sorter: true,
              },
              {
                dataIndex: 'lane',
                title: 'Lane',
                sorter: true,
              },
              {
                dataIndex: 'floor',
                title: 'Floor',
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
        <Descriptions.Item label="Enable Price Change">
          <TextField value={handleEmptyString(record.enablePriceChange)} />
        </Descriptions.Item>
        <Descriptions.Item label="GUI Version">
          <TextField value={handleEmptyString(record.gui_version)} />
        </Descriptions.Item>
        <Descriptions.Item label="Master Version">
          <TextField value={handleEmptyString(record.master_version)} />
        </Descriptions.Item>
        <Descriptions.Item label="Screen Saver">
          <TextField value={handleEmptyString(record.screenSaver)} />
        </Descriptions.Item>
        <Descriptions.Item label="Model">
          <TextField value={handleEmptyString(record.model)} />
        </Descriptions.Item>
        <Descriptions.Item label="Stocking">
          <TextField value={handleEmptyString(record.stocking)} />
        </Descriptions.Item>
        <Descriptions.Item label="Time to Idle">
          <TextField value={handleEmptyString(record.time_to_idle)} />
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
}
