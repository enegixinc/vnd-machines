import { Typography } from 'antd';
import React from 'react';
import { formatPrice, formatTime } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';

export const JoinedPaymentsTable = ({
  useTableProps,
}: {
  useTableProps: Parameters<typeof QuickTableSection>[0]['useTableProps'];
}) => {
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 16 }}>
        {'Payments'}
      </Typography.Title>
      <QuickTableSection
        id="payments"
        minimal
        syncWithLocation={false}
        showActions={false}
        showSearch={false}
        pagination={{
          pageSize: 5,
        }}
        useTableProps={useTableProps}
        resource={'payments'}
        columns={[
          {
            title: 'Amount',
            dataIndex: 'amount_paid',
            sorter: true,
            render: formatPrice,
          },
          {
            title: 'Dates',
            dataIndex: 'createdAt',
            sorter: true,
            render: formatTime,
          },
        ]}
      />
    </>
  );
};
