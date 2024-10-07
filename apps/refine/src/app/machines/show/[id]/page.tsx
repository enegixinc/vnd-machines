'use client';

import { Show, TextField } from '@refinedev/antd';
import { Descriptions, Divider, Space, Spin, Table, Typography } from 'antd';
import React from 'react';
import { useShow } from '@refinedev/core';
import { useRouter } from 'next/navigation';

import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { handleNullableText } from '@app/products/utils/handleNullableText';
import { formatPrice } from '@helpers';
import { JoinedOrdersTable } from '@components/joined-orders.table';
import { ShowFinance } from '@components/sections/finance';
// import { JoinedSuppliersTable } from '@app/suppliers/joined-suppliers.table';

const { Title } = Typography;

export default function MachineShow() {
  const { queryResult } = useShow({
    meta: {
      join: [
        {
          field: 'product',
          select: ['lane', 'floor', 'current_stock'],
        },
        {
          field: 'product.product',
          select: ['_id', 'fullName', 'price', 'productPictures', 'upc'],
        },
      ],
    },
  });
  const router = useRouter();

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
      <Title level={3}>{'Machine'}</Title>
      <Descriptions
        bordered
        column={2}
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="Name">
          <TextField value={record.name} />
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          <TextField value={record.description} />
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <TextField
            value={record.machineOnline ? 'Online' : 'Offline'}
            style={{
              color: record.machineOnline ? 'green' : 'red',
            }}
          />
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
      <ShowFinance record={record} />

      <Divider />
      <Title level={3} style={{ marginTop: 16 }}>
        {'Products'}
      </Title>

      <Table
        dataSource={record.product}
        pagination={{ pageSize: 5 }}
        onRow={(record) => {
          return {
            onClick: () => {
              console.log('record', record);

              router.push(`/products/show/${record.product._id}`);
            },
            style: { cursor: 'pointer' },
          };
        }}
        columns={[
          {
            title: 'Basic Info',
            children: [
              {
                dataIndex: ['product', 'productPictures'],
                title: 'Image',
                render: (productPictures) =>
                  handleMagextImage(productPictures ? productPictures[0] : ''),
              },
              {
                dataIndex: ['product', 'upc'],
                title: 'UPC',
                sorter: (a, b) => a.upc.localeCompare(b.upc),
                render: handleNullableText,
              },
              {
                dataIndex: ['product', 'fullName'],
                title: 'Name',
                sorter: true,
                render: handleNullableText,
              },
              {
                dataIndex: ['product', 'price'],
                title: 'Price',
                sorter: (a, b) => a.price - b.price,
                render: formatPrice,
              },
            ],
          },
          {
            title: 'Stock',
            children: [
              {
                title: 'Current Stock',
                dataIndex: 'current_stock',
                sorter: (a, b) => a.current_stock - b.current_stock,
              },
              {
                dataIndex: 'lane',
                title: 'Lane',
                sorter: (a, b) => a.lane - b.lane,
              },
              {
                dataIndex: 'floor',
                title: 'Floor',
                sorter: (a, b) => a.floor - b.floor,
              },
            ],
          },
        ]}
        loading={isLoading}
        showSorterTooltip
        rowKey="_id"
      />

      <Divider />
      <JoinedOrdersTable
        useTableProps={{
          meta: {
            join: [
              {
                field: 'machine',
              },
            ],
          },
          filters: {
            permanent: [
              {
                field: `machine._id`,
                operator: 'eq',
                value: record._id,
              },
            ],
          },
        }}
      />

      <Divider />
      <Title level={3} style={{ marginTop: 16 }}>
        {'Suppliers'}
      </Title>
      <Table
        dataSource={record.suppliers}
        pagination={{ pageSize: 5 }}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/users/show/${record.product._id}`);
            },
            style: { cursor: 'pointer' },
          };
        }}
        columns={[
          {
            dataIndex: 'firstName',
            title: 'first name',
            render: handleNullableText,
          },
          {
            dataIndex: 'lastName',
            title: 'last name',
            render: handleNullableText,
          },
          {
            dataIndex: 'email',
            title: 'email',
            render: handleNullableText,
          },
          {
            dataIndex: 'phoneNumber',
            title: 'phone',
            render: handleNullableText,
          },
          {
            dataIndex: 'businessName',
            title: 'business name',
            render: handleNullableText,
          },
          {
            dataIndex: 'active',
            title: 'Active',
            render: (value) => (
              <span style={{ color: value ? 'green' : 'red' }}>
                {value ? 'Active' : 'Inactive'}
              </span>
            ),
          },
        ]}
        loading={isLoading}
        showSorterTooltip
        rowKey="_id"
      />
    </Show>
  );
}
