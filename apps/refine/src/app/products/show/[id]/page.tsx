'use client';

import React from 'react';
import { useShow } from '@refinedev/core';
import { Show, TextField } from '@refinedev/antd';
import { Descriptions, Divider, Spin, Tag, Typography } from 'antd';
import { formatPercentage, formatPrice, handleEmptyString } from '@helpers';

const { Title } = Typography;

export default function PromotionShow() {
  const { queryResult } = useShow({
    meta: {
      join: [
        {
          field: 'machines',
          select: ['_id', 'description'],
        },
        {
          field: 'products',
          select: ['_id', 'fullName'],
        },
        {
          field: 'categories',
          select: ['_id', 'fullName'],
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

  const record = data?.data;
  if (!record) {
    return null;
  }

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>{record.title}</Title>
      <Descriptions bordered column={1} labelStyle={{ fontWeight: 'bold' }}>
        <Descriptions.Item label="Promotion Type">
          <TextField value={handleEmptyString(record.promoType)} />
        </Descriptions.Item>

        <Descriptions.Item label="Category or Product">
          <TextField value={handleEmptyString(record.cateOrProd)} />
        </Descriptions.Item>

        <Descriptions.Item label="Code">
          <TextField value={handleEmptyString(record.code)} />
        </Descriptions.Item>

        <Descriptions.Item label="Department">
          <TextField value={handleEmptyString(record.department)} />
        </Descriptions.Item>

        <Descriptions.Item label="Discount Amount">
          {record.percentage
            ? formatPercentage(record.amount)
            : formatPrice(record.amount)}
        </Descriptions.Item>

        <Descriptions.Item label="Start Date">
          <TextField value={new Date(record.startDate).toLocaleDateString()} />
        </Descriptions.Item>

        <Descriptions.Item label="End Date">
          <TextField value={new Date(record.endDate).toLocaleDateString()} />
        </Descriptions.Item>

        <Descriptions.Item label="Start Time">
          <TextField value={record.startTime} />
        </Descriptions.Item>

        <Descriptions.Item label="End Time">
          <TextField value={record.endTime} />
        </Descriptions.Item>

        <Descriptions.Item label="Active">
          <Tag color={record.active ? 'green' : 'red'}>
            {record.active ? 'Yes' : 'No'}
          </Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Title level={3} style={{ marginTop: 16 }}>
        {'Associated Entities'}
      </Title>
      <Descriptions bordered column={1} labelStyle={{ fontWeight: 'bold' }}>
        <Descriptions.Item label="Machines">
          {record.machines?.map((machine) => (
            <div key={machine._id}>{machine.description}</div>
          ))}
        </Descriptions.Item>

        <Descriptions.Item label="Products">
          {record.products?.map((product) => (
            <div key={product._id}>{product.fullName}</div>
          ))}
        </Descriptions.Item>

        <Descriptions.Item label="Categories">
          {record.categories?.map((category) => (
            <div key={category._id}>{category.fullName}</div>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
}
