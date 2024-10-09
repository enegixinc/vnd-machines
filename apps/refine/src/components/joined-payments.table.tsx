import { Typography } from 'antd';
import React from 'react';
import { formatPrice, formatTime } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';

export const JoinedPaymentsTable = ({ data }: any) => {
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 16 }}>
        {'Payments'}
      </Typography.Title>
      <QuickTableSection
        minimal
        syncWithLocation={false}
        showActions={false}
        showSearch={false}
        pagination={{
          pageSize: 5,
        }}
        dataSource={data}
        columns={[
          {
            title: 'amount',
            dataIndex: 'amount',
            sorter: true,
            render: formatPrice,
          },
          {
            title: 'Date',
            dataIndex: 'payment_date',
            sorter: true,
            render: formatTime,
          },
        ]}
      />
    </>
  );
};
