import { Typography } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';
import { QuickTableSection } from '@components/quick-table-section';
import { ignoreColumns } from '@helpers';
import { supplierColumns } from '@app/suppliers/columns';

export const JoinedSuppliersTable = ({
  useTableProps,
}: {
  useTableProps: Parameters<typeof QuickTableSection>[0]['useTableProps'];
}) => {
  const router = useRouter();
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 16 }}>
        {'Suppliers'}
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
              router.push(`/suppliers/show/${record._id}`);
            },
            style: { cursor: 'pointer' },
          };
        }}
        useTableProps={useTableProps}
        resource={'users'}
        columns={ignoreColumns(supplierColumns, [''])}
      />
    </>
  );
};
