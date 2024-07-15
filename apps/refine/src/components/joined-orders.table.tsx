import { Tag, Typography } from 'antd';
import React from 'react';
import { IoIosCash } from 'react-icons/io';
import { RiVisaFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { formatPrice, formatTime } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';

export const JoinedOrdersTable = ({
  useTableProps,
}: {
  useTableProps: Parameters<typeof QuickTableSection>[0]['useTableProps'];
}) => {
  const router = useRouter();
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 16 }}>
        {'Orders'}
      </Typography.Title>
      <QuickTableSection
        minimal
        syncWithLocation={false}
        showActions={false}
        showSearch={false}
        pagination={{
          pageSize: 5,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/orders/show/${record._id}`);
            },
            style: { cursor: 'pointer' },
          };
        }}
        useTableProps={useTableProps}
        resource={'orders'}
        columns={[
          {
            title: 'Machine',
            dataIndex: ['machine', 'description'],
            onCell: (record) => ({
              onClick: (e) => {
                e.stopPropagation();
                router.push(`/machines/show/${record.machine._id}`);
              },
              style: {
                cursor: 'pointer',
                color: '#1890ff',
              },
            }),
          },
          {
            title: 'Order',
            dataIndex: 'cart_number',
            onCell: (record) => ({
              onClick: () => router.push(`/orders/show/${record._id}`),
              style: {
                cursor: 'pointer',
                color: '#1890ff',
              },
            }),
            sorter: true,
          },
          {
            title: 'Total',
            dataIndex: ['total'],
            render: formatPrice,
            sorter: true,
          },
          {
            title: 'Quantity',
            dataIndex: 'totalQuantity',
            sorter: true,
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
            sorter: true,
          },
          {
            title: 'Date',
            dataIndex: 'createdAt',
            // render: (date) => dayjs(date).fromNow(),
            render: formatTime,
            sorter: true,
          },
        ]}
      />
    </>
  );
};
