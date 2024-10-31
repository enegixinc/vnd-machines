'use client';

import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Descriptions, Divider, Spin, Typography } from 'antd';
import React from 'react';
import { formatPrice, handleEmptyString } from '@helpers';
import { formatDate } from '@components/description-dates';
import { SerializedPromotionDto } from '../../../../../../backend/src/modules/promotions/dto/serialize-promotion';

const { Title } = Typography;

export default function PromotionShow() {
  const { queryResult } = useShow<SerializedPromotionDto>({
    meta: {
      join: [
        {
          field: 'products',
        },
        {
          field: 'machines',
        },
        {
          field: 'category',
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
      <Title level={3}>{'Promotion Details'}</Title>
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

        <Descriptions.Item label="Title">
          <TextField value={handleEmptyString(record.title)} />
        </Descriptions.Item>

        <Descriptions.Item label="Promotion Code">
          <TextField value={handleEmptyString(record.code)} />
        </Descriptions.Item>

        <Descriptions.Item label="Start Date">
          <TextField value={formatDate(record.startDate)} />
        </Descriptions.Item>

        <Descriptions.Item label="End Date">
          <TextField value={formatDate(record.endDate)} />
        </Descriptions.Item>

        <Descriptions.Item label="Start Time">
          <TextField value={handleEmptyString(record.startTime)} />
        </Descriptions.Item>

        <Descriptions.Item label="End Time">
          <TextField value={handleEmptyString(record.endTime)} />
        </Descriptions.Item>

        <Descriptions.Item label="Amount">
          <TextField value={formatPrice(record.amount)} />
        </Descriptions.Item>

        <Descriptions.Item label="Active">
          <TextField value={record.active ? 'Yes' : 'No'} />
        </Descriptions.Item>

        <Descriptions.Item label="Category">
          <TextField value={handleEmptyString(record.category?.name)} />
        </Descriptions.Item>

        <Descriptions.Item label="Machines">
          {record.machines?.map((machine) => (
            <TextField
              key={machine._id}
              value={handleEmptyString(machine.name)}
            />
          ))}
        </Descriptions.Item>

        <Descriptions.Item label="Products">
          {record.products?.map((product) => (
            <TextField
              key={product._id}
              value={handleEmptyString(product.name)}
            />
          ))}
        </Descriptions.Item>
      </Descriptions>

      <Divider />
      {/* Add more sections like financials or orders if relevant */}
    </Show>
  );
}
