import React from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Card, Tag } from 'antd';
import dayjs from 'dayjs';
import { QuickTableSection } from '@components/quick-table-section';
import { IoIosCash } from 'react-icons/io';
import { RiVisaFill } from 'react-icons/ri';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { formatTime } from '@helpers';

dayjs.extend(relativeTime);

export const DashboardLatestOrders: React.FC<{ limit?: number }> = ({
  limit = 5,
}) => {
  const router = useRouter();

  return (
    <Card
      styles={{
        body: {
          padding: 0,
          margin: 0,
        },
      }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <UnorderedListOutlined />
          <span>Latest Orders</span>
        </div>
      }
    >
      <QuickTableSection
        resource={'orders'}
        showActions={false}
        pagination={false}
        showSearch={false}
        minimal
        useTableProps={{
          pagination: {
            mode: 'off',
          },
          meta: {
            join: [{ field: 'machine' }],
            limit,
          },
        }}
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
            title: 'Order',
            dataIndex: 'cart_number',
            onCell: (record) => ({
              onClick: () => router.push(`/orders/show/${record._id}`),
              style: {
                cursor: 'pointer',
                color: '#1890ff',
              },
            }),
          },
          {
            title: 'Total',
            dataIndex: ['total'],
            render: (total, record) => `${total} ${record.currency}`,
          },
          {
            title: 'Quantity',
            dataIndex: 'totalQuantity',
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
            title: 'Date',
            dataIndex: 'createdAt',
            // render: (date) => dayjs(date).fromNow(),
            render: formatTime,
          },
        ]}
      />
    </Card>
  );
};
