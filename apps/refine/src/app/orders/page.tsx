'use client';

import { Divider, Tag } from 'antd';
import React from 'react';
import { handleEmptyString } from '@helpers';
import { QuickTable } from '@components/quick-table';

export default function OrdersList() {
  const data = [
    {
      _id: '66731b7280930d1f5837299a',
      __v: 0,
      createdAt: '2024-06-19T20:54:53.000Z',
      updatedAt: '2024-06-20T21:34:25.504Z',
      deletedAt: null,
      lastSyncAt: '2024-06-21T00:34:22.949Z',
      status: 'Completed',
      payment_type: 'CASH',
      lang: 'en',
      referTo: 'tryvnd@point24h.com',
      tax: '0',
      total: '0',
      currency: 'KD',
      createdAtUtc: '2024-06-19T17:54:53.000Z',
      utcOffset: '3',
      payment_transaction_id: '',
      payment_receipt: '',
      cart_number: '495',
      card_number: '',
      card_department: '',
      email: '',
      reservation_code: '',
      return_code: '',
      products: [
        {
          _id: '66731b7280930d1f5837299b',
          __v: 1,
          createdAt: '2024-06-20T21:34:25.504Z',
          updatedAt: '2024-06-20T21:34:25.504Z',
          deletedAt: null,
          lastSyncAt: null,
          quantity: 1,
          discount: '0',
          proposed: false,
          lane: '158',
          row_number: '49501',
          snapshot_name: '',
          soldPrice: '0',
          tax_amount: '0',
          retail_price: '0',
        },
      ],
    },
  ];

  return (
    <>
      <QuickTable
        title={'Orders'}
        resource={'orders'}
        columns={[
          {
            title: 'Order ID',
            dataIndex: '_id',
            render: handleEmptyString,
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: handleEmptyString,
          },
          {
            title: 'Payment Type',
            dataIndex: 'payment_type',
            render: handleEmptyString,
          },
          {
            title: 'Total',
            dataIndex: 'total',
            render: handleEmptyString,
          },
          {
            title: 'Currency',
            dataIndex: 'currency',
            render: handleEmptyString,
          },
          {
            title: 'Cart Number',
            dataIndex: 'cart_number',
            render: handleEmptyString,
          },
          {
            title: 'Email',
            dataIndex: 'email',
            render: handleEmptyString,
          },
          {
            title: 'Active',
            dataIndex: 'status',
            render: (status) =>
              status === 'Completed' ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">Inactive</Tag>
              ),
          },
        ]}
      />
    </>
  );
}
