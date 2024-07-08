import { Table, Typography } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';
import { TextField } from '@refinedev/antd';
import { ContractStatus, ISerializedContract } from '@core';

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
                sorter: true,
              },
              {
                dataIndex: 'endDate',
                title: 'End Date',
                sorter: true,
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
                sorter: true,
              },
              {
                dataIndex: 'feeType',
                title: 'Fee Type',
              },
              {
                title: 'Orders',
                sorter: true,
                render: (record) => record.orders.length,
              },
              {
                dataIndex: 'totalRevenue',
                title: 'Revenue',
                sorter: true,
                render: (totalRevenue) =>
                  `${Number(totalRevenue).toFixed(2)} KD`,
              },
            ],
          },
        ]}
      />
    </>
  );
};
