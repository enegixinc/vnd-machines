import { Table, Typography } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';
import { TextField } from '@refinedev/antd';
import { ContractStatus, ISerializedContract } from '@core';
import { formatPrice } from '@helpers';

export const JoinedContractsTable = ({
  record,
}: {
  record: {
    contracts: ISerializedContract[];
  };
}) => {
  const router = useRouter();

  // If the record has contracts but the first product does not have an _id,
  // set the contracts to an empty array because it's false data
  if (record.contracts.length && !record.contracts[0]._id)
    record.contracts = [];

  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 16 }}>
        {'Contracts'}
      </Typography.Title>
      <Table
        pagination={{ pageSize: 5 }}
        dataSource={record.contracts}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/contracts/show/${record._id}`);
            },
            style: { cursor: 'pointer' },
          };
        }}
        columns={[
          {
            title: 'Contract Details',
            children: [
              {
                dataIndex: 'startDate',
                title: 'Start Date',
                sorter: (a, b) => a.endDate.localeCompare(b.endDate),
              },
              {
                dataIndex: 'endDate',
                title: 'End Date',
                sorter: (a, b) => a.endDate.localeCompare(b.endDate),
              },
              {
                dataIndex: 'status',
                title: 'Status',
                render: (status) => (
                  <TextField
                    value={
                      status === ContractStatus.ACTIVE
                        ? 'Active'
                        : status === ContractStatus.EXPIRED
                        ? 'Expired'
                        : 'Terminated'
                    }
                    style={{
                      color:
                        status === ContractStatus.ACTIVE
                          ? '#52c41a'
                          : status === ContractStatus.EXPIRED
                          ? '#f5222d'
                          : '#faad14',
                    }}
                  />
                ),
              },
            ],
          },
          {
            title: 'Financial Details',
            children: [
              {
                dataIndex: 'feePerSale',
                title: 'Fee Per Sale',
                sorter: (a, b) => a.feePerSale - b.feePerSale,
              },
              {
                dataIndex: 'feeType',
                title: 'Fee Type',
              },
              {
                title: 'Orders',
                render: (record) => record.orders.length,
                sorter: (a, b) => a.orders.length - b.orders.length,
              },
              {
                dataIndex: 'totalRevenue',
                title: 'Revenue',
                render: formatPrice,
                sorter: (a, b) => a.totalRevenue - b.totalRevenue,
              },
            ],
          },
        ]}
      />
    </>
  );
};
