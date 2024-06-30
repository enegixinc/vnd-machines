'use client';

import { ImageField, List, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Card, Descriptions, Divider, Table, Tag, Typography } from 'antd';
import React from 'react';
import { BrandEntity, SerializedBrandDto } from '@frontend/api-sdk';
import { handleEmptyString, safeArrayCounter } from '@helpers';
import { defaultSrc } from '@app/config';
import { ShowFinance } from '@components/sections/finance';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { QuickTableSection } from '@components/quick-table-section';
import { IoIosCash } from 'react-icons/io';
import { RiVisaFill } from 'react-icons/ri';
import { formatDate } from '@components/description-dates';
import { JoinedProductsTable } from '@components/joined-products.table';

const { Title } = Typography;

export default function BrandShow() {
  const { queryResult } = useShow<SerializedBrandDto>({
    meta: {
      join: [
        {
          field: 'products',
        },
        {
          field: 'supplier',
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
      <Title level={3}>{'Brand Details'}</Title>
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
          <TextField value={formatDate(record.updatedAt)} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={formatDate(record.createdAt)} />
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
      <Title level={3} style={{ marginTop: 16 }}>
        {'Orders'}
      </Title>

      <Card>
        <Table
          dataSource={record.orders}
          columns={[
            {
              title: 'Cart Number',
              dataIndex: 'cart_number',
            },
            {
              title: 'Payment Method',
              dataIndex: 'payment_type',
              render: (paymentType) => (
                <Tag
                  icon={
                    paymentType === 'CASH' ? (
                      <IoIosCash
                        style={{
                          fontSize: '2em',
                          verticalAlign: 'middle',
                        }}
                      />
                    ) : (
                      <RiVisaFill
                        style={{
                          fontSize: '2em',
                          verticalAlign: 'middle',
                        }}
                      />
                    )
                  }
                  color={paymentType === 'CASH' ? 'green' : 'blue'}
                />
              ),
            },
            {
              title: 'Total',
              dataIndex: ['total'],
              sorter: true,
              render: (total, record) => `${total} ${record.currency}`,
            },
          ]}
        />
      </Card>
    </Show>
  );
}
