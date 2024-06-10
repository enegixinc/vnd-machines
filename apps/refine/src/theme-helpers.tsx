'use client';
import { Descriptions, Form, Input } from 'antd';
import { TextField } from '@refinedev/antd';
import React from 'react';

export const MultiLangDescription = ({
  record,
}: {
  record: { name: { en: string; ar: string } } | unknown;
}) => {
  return (
    <>
      <Descriptions.Item label="Name (English)">
        <TextField value={'asd1'} />
      </Descriptions.Item>
      <Descriptions.Item label="Name (Arabic)">
        <TextField value={'asd'} />
      </Descriptions.Item>
    </>
  );
};

export const SalesDescription = ({
  record,
}: {
  record:
    | { totalSoldProducts: number; totalOrders: number; totalRevenue: number }
    | unknown;
}) => {
  if (
    !record ||
    typeof record !== 'object' ||
    !('totalSoldProducts' in record) ||
    !('totalOrders' in record) ||
    !('totalRevenue' in record)
  ) {
    return <div>Invalid record data</div>;
  }

  const { totalSoldProducts, totalOrders, totalRevenue } = record as {
    totalSoldProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };

  return (
    <Descriptions>
      <Descriptions.Item label="Total Sold Products">
        <TextField value={totalSoldProducts} />
      </Descriptions.Item>
      <Descriptions.Item label="Total Orders">
        <TextField value={totalOrders} />
      </Descriptions.Item>
      <Descriptions.Item label="Total Revenue">
        <TextField value={totalRevenue} />
      </Descriptions.Item>
    </Descriptions>
  );
};

export const DateDescription = ({
  record,
}: {
  record: { updatedAt: string; createdAt: string } | unknown;
}) => {
  if (
    !record ||
    typeof record !== 'object' ||
    !('updatedAt' in record) ||
    !('createdAt' in record)
  ) {
    return <div>Invalid record data</div>;
  }

  const { updatedAt, createdAt } = record as {
    updatedAt: string;
    createdAt: string;
  };

  return (
    <>
      <Descriptions.Item label="Updated At">
        <TextField value={updatedAt} />
      </Descriptions.Item>
      <Descriptions.Item label="Created At">
        <TextField value={createdAt} />
      </Descriptions.Item>
    </>
  );
};

export const MultiLangInput = () => {
  return (
    <>
      <Form.Item
        style={{
          flex: 1,
        }}
        label="Name (English)"
        name={['name', 'en']}
        rules={[
          {
            required: true,
            message: 'Please enter the English name',
          },
        ]}
      >
        <Input placeholder="Name in English" />
      </Form.Item>
      <Form.Item
        style={{
          flex: 1,
        }}
        label="Name (Arabic)"
        name={['name', 'ar']}
        rules={[
          {
            required: true,
            message: 'Please enter the Arabic name',
          },
        ]}
      >
        <Input placeholder="Name in Arabic" />
      </Form.Item>
    </>
  );
};
