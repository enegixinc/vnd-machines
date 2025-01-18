import React, { useEffect, useState } from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Card, Tag } from 'antd';
import dayjs from 'dayjs';
import { QuickTableSection } from '@components/quick-table-section';
import { IoIosCash } from 'react-icons/io';
import { RiVisaFill } from 'react-icons/ri';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { formatPrice, formatTime } from '@helpers';
import { vndClient } from '@providers/api';

dayjs.extend(relativeTime);

export const DashboardLatestOrders: React.FC<{ limit?: number }> = ({
  limit = 10,
}) => {
  const router = useRouter();

  const [transactionsCount, setTransactionsCount] = useState(0);
  useEffect(() => {
    const fetchTransactionsCount = async () => {
      try {
        const { total } = await vndClient.orders.getMany({
          limit: 1,
        });
        setTransactionsCount(total);
      } catch (error) {
        console.error('Failed to fetch transactions count:', error);
      }
    };
    fetchTransactionsCount();
  }, []);

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
          <span>Last Transactions</span>
          <Tag color="blue">{transactionsCount}</Tag>
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
            join: [
              { field: 'products' },
              { field: 'products.product' },
              { field: 'machine' },
            ],
            limit,
          },
        }}
        onRow={(record) => ({
          onClick: () => router.push(`/orders/show/${record._id}`),
          style: {
            cursor: 'pointer',
          },
        })}
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
          },
          {
            title: 'Total',
            dataIndex: ['total'],
            render: formatPrice,
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
