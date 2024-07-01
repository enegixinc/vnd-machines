'use client';

import { Divider, Tag } from 'antd';
import React from 'react';
import { handleEmptyString } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';
import { IoIosCash } from 'react-icons/io';
import { RiVisaFill } from 'react-icons/ri';
import { CanAccess } from '@refinedev/core';
import { useRouter } from 'next/navigation';

export default function OrdersList() {
  const router = useRouter();
  return (
    <CanAccess action="list" fallback={<div>Unauthorized</div>}>
      <QuickTableSection
        pageTitle="Orders"
        resource={'orders'}
        showActions={false}
        onRow={(record) => ({
          onClick: () => {
            if (!record._id) return;
            router.push(`/orders/show/${record._id}`);
          },
          style: { cursor: 'pointer' },
        })}
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
            title: 'Products',
            dataIndex: 'totalQuantity',
          },
          {
            title: 'Total',
            dataIndex: ['total'],
            sorter: true,
            render: (total, record) => `${total} ${record.currency}`,
          },
        ]}
      />
    </CanAccess>
  );
}
