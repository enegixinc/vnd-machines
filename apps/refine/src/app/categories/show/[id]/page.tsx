'use client';

import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Card, Descriptions, Divider, Table, Tag, Typography } from 'antd';
import React from 'react';
import { SerializedCategoryDto } from '@frontend/api-sdk';
import { safeArrayCounter } from '@helpers';
import { ShowFinance } from '@components/sections/finance';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { IoIosCash } from 'react-icons/io';
import { RiVisaFill } from 'react-icons/ri';
import { JoinedProductsTable } from '@components/joined-products.table';
import { JoinedOrdersTable } from '@components/joined-orders.table';

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
        {
          field: 'orders',
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
        column={2}
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

      {/*<Divider />*/}
      {/*<Title level={3} style={{ marginTop: 16 }}>*/}
      {/*  {'Suppliers'}*/}
      {/*</Title>*/}

      {/*<Card>*/}
      {/*  <Table*/}
      {/*    dataSource={record.suppliers}*/}
      {/*    columns={[*/}
      {/*      {*/}
      {/*        dataIndex: 'fullName',*/}
      {/*        title: 'Full Name',*/}
      {/*        sorter: true,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        dataIndex: 'email',*/}
      {/*        title: 'Email',*/}
      {/*        sorter: true,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        dataIndex: 'phoneNumber',*/}
      {/*        title: 'Phone Number',*/}
      {/*        sorter: true,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        dataIndex: 'totalOrders',*/}
      {/*        title: 'Total Orders',*/}
      {/*        sorter: true,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        dataIndex: 'totalSoldProducts',*/}
      {/*        title: 'Total Sold Products',*/}
      {/*        sorter: true,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        dataIndex: 'totalRevenue',*/}
      {/*        title: 'Total Revenue',*/}
      {/*        sorter: true,*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*</Card>*/}

      <Divider />
      <JoinedOrdersTable record={record} />
    </Show>
  );
}
