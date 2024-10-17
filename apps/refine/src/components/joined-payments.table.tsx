import { Typography } from 'antd';
import React from 'react';
import { formatPrice, formatTime } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';
import { useGetIdentity } from '@refinedev/core';
import { IUserEntity, UserRole } from '@core';

export const JoinedPaymentsTable = ({
  useTableProps,
}: {
  useTableProps: Parameters<typeof QuickTableSection>[0]['useTableProps'];
}) => {
  const { data: currentUser, isLoading } = useGetIdentity<IUserEntity>();
  const isSupplier = currentUser?.role === UserRole.SUPPLIER;

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
            title: isSupplier ? 'Received' : 'Paid',
            dataIndex: 'amount_paid',
            sorter: true,
            render: formatPrice,
          },
          {
            title: 'Gained',
            dataIndex: 'amount_gained',
            sorter: true,
            hidden: isSupplier,
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
