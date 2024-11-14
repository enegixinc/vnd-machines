'use client';

import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Descriptions, Divider, Spin, Tag, Typography } from 'antd';
import React from 'react';
import { formatPrice, handleEmptyString } from '@helpers';
import { formatDate } from '@components/description-dates';
import Link from 'next/link';

const { Title } = Typography;

export default function PromotionShow() {
  const { queryResult } = useShow({
    meta: {
      join: [
        {
          field: 'product',
          select: ['_id', 'fullName'],
        },
        {
          field: 'machine',
          select: ['_id', 'description'],
        },
        {
          field: 'category',
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
      <Title level={3}>{'Promotion Details'}</Title>
      <Descriptions
        bordered
        column={2}
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="Title">
          <TextField value={handleEmptyString(record.title)} />
        </Descriptions.Item>

        <Descriptions.Item label="Promotion Type">
          <Tag color="blue">{handleEmptyString(record.promoType)}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Start Date">
          <TextField value={formatDate(record.startDate)} />
        </Descriptions.Item>

        <Descriptions.Item label="End Date">
          <TextField value={formatDate(record.endDate)} />
        </Descriptions.Item>

        <Descriptions.Item label="Start Time">
          <TextField value={formatDate(record.startTime)} />
        </Descriptions.Item>

        <Descriptions.Item label="End Time">
          <TextField value={formatDate(record.endTime)} />
        </Descriptions.Item>

        <Descriptions.Item label="Amount">
          <TextField value={formatPrice(record.amount)} />
        </Descriptions.Item>

        <Descriptions.Item label="Active">
          <Tag color={record.active ? 'green' : 'red'}>
            {record.active ? 'Yes' : 'No'}
          </Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Title level={3}>{'Associations'}</Title>
      <Descriptions
        bordered
        column={1}
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="Products">
          {record.isAllProducts ? (
            <Tag color="green">All Products</Tag>
          ) : record.product.length > 0 ? (
            record.product.map((product, index) => {
              const isLast = index === record.product.length - 1;
              return (
                <>
                  <Link
                    href={`/products/show/${product._id}`}
                    key={product._id}
                  >
                    {product.fullName}
                  </Link>
                  {!isLast && <br />}
                </>
              );
            })
          ) : (
            <Tag color="warning">No Products</Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Categories">
          {record.category.length > 0 ? (
            record.category.map((category, index) => {
              const isLast = index === record.category.length - 1;

              return (
                <>
                  <Link
                    href={`/categories/show/${category._id}`}
                    key={category._id}
                  >
                    {category.fullName}
                  </Link>
                  {!isLast && <br />}
                </>
              );
            })
          ) : (
            <Tag color="warning">No Categories</Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Machines">
          {record.isAllMachines ? (
            <Tag color="green">All Machines</Tag>
          ) : (
            record.machine.map((machine, index) => {
              const isLast = index === record.machine.length - 1;
              return (
                <>
                  <div key={machine._id}>
                    <Link href={`/machines/show/${machine._id}`}>
                      {machine.description}
                    </Link>
                  </div>
                  {!isLast && <br />}
                </>
              );
            })
          )}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Title level={3}>{'Extra Details'}</Title>
      <Descriptions
        bordered
        column={2}
        labelStyle={{
          fontWeight: 'bold',
          width: '20%',
        }}
      >
        <Descriptions.Item label="Code">
          <TextField value={handleEmptyString(record.code)} />
        </Descriptions.Item>

        <Descriptions.Item label="Department">
          <TextField value={handleEmptyString(record.department)} />
        </Descriptions.Item>

        <Descriptions.Item label="Products to Buy">
          <TextField value={record.productsToBuy.toString()} />
        </Descriptions.Item>

        <Descriptions.Item label="Percentage">
          <Tag color={record.percentage ? 'green' : 'red'}>
            {record.percentage ? 'Yes' : 'No'}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Refer To">
          <TextField value={handleEmptyString(record.referTo)} />
        </Descriptions.Item>

        <Descriptions.Item label="Is One-Time">
          <Tag color={record.isOne ? 'green' : 'red'}>
            {record.isOne ? 'Yes' : 'No'}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
}
