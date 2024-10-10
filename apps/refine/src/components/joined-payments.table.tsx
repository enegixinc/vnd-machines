import { Typography } from 'antd';
import React from 'react';
import { formatPrice, formatTime } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';
import { useRouter } from 'next/navigation';

export const JoinedPaymentsTable = ({
  useTableProps,
}: {
  useTableProps: Parameters<typeof QuickTableSection>[0]['useTableProps'];
}) => {
  const router = useRouter();

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
            title: 'amount',
            dataIndex: 'amount_paid',
            sorter: true,
            render: formatPrice,
          },
          {
            title: 'Datess',
            dataIndex: 'createdAt',
            sorter: true,
            render: formatTime,
          },
        ]}
      />
    </>
  );
};
