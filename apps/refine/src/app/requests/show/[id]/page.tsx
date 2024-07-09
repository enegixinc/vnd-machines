'use client';

import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Descriptions, Divider, Spin, Table, Typography } from 'antd';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { handleNullableText } from '@app/products/utils/handleNullableText';
import { formatDate } from '@components/description-dates';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';

const { Title } = Typography;

export default function FillRequestShow() {
  const { id } = useParams();
  const { queryResult } = useShow({
    resource: 'requests',
    id: id.toString(),
    meta: {
      join: [
        {
          field: 'machine',
        },
        {
          field: 'products',
          select: ['product', 'quantity'],
          join: [
            {
              field: 'product',
            },
            {
              field: 'products.product',
            },
          ],
        },
      ],
    },
  });
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
  const router = useRouter();
  const record = data?.data;
  if (!record) {
    return null;
  }

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>{'Fill Request Details'}</Title>
      <Descriptions
        bordered
        column={2}
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="Machine Name">
          <TextField
            style={{
              color: '#1890ff',
              cursor: 'pointer',
            }}
            onClick={() => {
              router.push(`/machines/show/${record.machine?._id}`);
            }}
            value={record.machine?.description}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Notes">
          <TextField value={handleNullableText(record.notes)} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <TextField value={formatDate(record.createdAt)} />
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          <TextField value={formatDate(record.updatedAt)} />
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Typography.Title level={3}>{'Products'}</Typography.Title>

      <Table
        pagination={{ pageSize: 5, total: record.products.length }}
        dataSource={record.products}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/products/show/${record.product._id}`);
            },
            style: { cursor: 'pointer' },
          };
        }}
        columns={[
          {
            dataIndex: ['product', 'productPictures'],
            title: 'Image',
            render: (images) => handleMagextImage(images[0]),
          },
          {
            dataIndex: ['product', 'fullName'],
            title: 'Product',
          },
          {
            dataIndex: 'quantity',
            title: 'Quantity',
          },
        ]}
      />
    </Show>
  );
}
