'use client';

import { Tag } from 'antd';
import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';
import { IoIosCash } from 'react-icons/io';
import { RiVisaFill } from 'react-icons/ri';
import { CanAccess } from '@refinedev/core';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function OrdersList() {
  const router = useRouter();
  return (
    <CanAccess action="list" fallback={<div>Unauthorized</div>}>
      <QuickTableSection
        pageTitle="Orders"
        meta={{
          join: [{ field: 'machine' }],
        }}
        resource={'orders'}
        showActions={false}
        meta={{
          join: [
            {
              field: 'machine',
            },
          ],
        }}
        sorters={{
          initial: [
            {
              field: 'createdAt',
              order: 'desc',
            },
          ],
        }}
        onRow={(record) => ({
          onClick: () => {
            if (!record._id) return;
            router.push(`/orders/show/${record._id}`);
          },
          style: { cursor: 'pointer' },
        })}
        columns={[
          {
            title: 'Machine',
            dataIndex: ['machine', 'description'],
            onCell: (record) => ({
              onClick: () =>
                router.push(`/machines/show/${record.machine._id}`),
              style: {
                cursor: 'pointer',
                color: '#1890ff',
              },
            }),
          },
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
            title: 'Products',
            dataIndex: 'totalQuantity',
          },
          {
            title: 'Total',
            dataIndex: ['total'],
            sorter: true,
            render: (total, record) => `${total} ${record.currency}`,
          },
          {
            title: 'Date',
            dataIndex: 'createdAt',
            // render: (date) => dayjs(date).fromNow(),
            render: (date) => dayjs(date).format('MM/DD/YYYY hh:mm A'),
            sorter: true,
          },
        ]}
      />
    </CanAccess>
  );
}
