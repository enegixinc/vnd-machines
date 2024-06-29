import React from 'react';
import { useList } from '@refinedev/core';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Card, Skeleton as AntdSkeleton, Tag } from 'antd';
import dayjs from 'dayjs';
import styles from './index.module.css';
import { QuickTableSection } from '@components/quick-table-section';
import { IoIosCash } from 'react-icons/io';
import { RiVisaFill } from 'react-icons/ri';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';

dayjs.extend(relativeTime);

export const DashboardLatestOrders: React.FC<{ limit?: number }> = ({
  limit = 5,
}) => {
  const router = useRouter();

  return (
    <Card
      headStyle={{ padding: '16px' }}
      bodyStyle={{
        padding: '0 1rem',
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
            render: (date) => dayjs(date).fromNow(),
          },
        ]}
      />
    </Card>
  );
};

const Skeleton = () => {
  return (
    <div className={styles.item}>
      <AntdSkeleton.Avatar
        active
        size={48}
        shape="square"
        style={{
          borderRadius: '4px',
          marginRight: '16px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <AntdSkeleton.Button
          active
          style={{
            height: '16px',
          }}
        />
        <AntdSkeleton.Button
          active
          style={{
            width: '300px',
            height: '16px',
          }}
        />
      </div>
    </div>
  );
};
