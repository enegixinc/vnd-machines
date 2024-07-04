import { Table, Tag, Typography } from 'antd';
import React from 'react';
import { SerializedProductDto } from '@frontend/api-sdk';
import { IoIosCash } from 'react-icons/io';
import { RiVisaFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { formatPrice, formatTime } from '@helpers';

export const JoinedOrdersTable = ({
  record,
  columns,
}: {
  record: {
    orders: SerializedProductDto[];
  };
  columns: any[];
}) => {
  const router = useRouter();
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 16 }}>
        {'Orders'}
      </Typography.Title>
      <Table
        pagination={{ pageSize: 5 }}
        dataSource={record.orders}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/orders/show/${record._id}`);
            },
            style: { cursor: 'pointer' },
          };
        }}
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
            render: formatPrice,
          },
          {
            title: 'Date',
            dataIndex: 'createdAt',
            render: formatTime,
          },
        ]}
      />
    </>
  );
};
