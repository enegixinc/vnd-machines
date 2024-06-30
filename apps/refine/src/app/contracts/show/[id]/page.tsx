'use client';

import React from 'react';
import { Descriptions, Divider, Table, Typography } from 'antd';
import { CanAccess, useShow } from '@refinedev/core';
import { handleEmptyString } from '@helpers';
import { handleNullableText } from '@app/products/utils/handleNullableText';
import { Show, TextField } from '@refinedev/antd';
import { FeeType } from '@core';
import { JoinedOrdersTable } from '@components/joined-orders.table';

const { Title } = Typography;

export default function ContractShow() {
  const { queryResult } = useShow({
    meta: {
      join: [
        {
          field: 'supplier',
        },
      ],
    },
  });

  const { data, isLoading } = queryResult;

  const contract = data?.data;
  if (!contract) {
    return null;
  }

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>{'Contract Details'}</Title>
      <Descriptions
        bordered
        column={2}
        labelStyle={{ fontWeight: 'bold', width: '20%' }}
      >
        <Descriptions.Item label="Start Date">
          <TextField value={contract.startDate} />
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          <TextField value={contract.endDate} />
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          <TextField value={handleEmptyString(contract.description)} />
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <TextField value={contract.status} />
        </Descriptions.Item>
        <Descriptions.Item label="Fee Per Sale">
          <TextField
            value={`${Number(contract.feePerSale).toFixed(2)} ${
              contract.feeType === FeeType.PERCENTAGE ? ' %' : ' KD'
            }`}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Total Orders">
          <TextField value={contract.totalOrders} />
        </Descriptions.Item>
        <Descriptions.Item label="Total Sales">
          <TextField value={`${Number(contract.totalSales).toFixed(2)} KD`} />
        </Descriptions.Item>
        <Descriptions.Item label="Total Revenue">
          <TextField value={`${Number(contract.totalRevenue).toFixed(2)} KD`} />
        </Descriptions.Item>
      </Descriptions>

      <CanAccess action="show" resource="suppliers">
        <Divider />
        <Title level={3} style={{ marginTop: 16 }}>
          {'Supplier Details'}
        </Title>

        <Table
          dataSource={[contract.supplier]}
          columns={[
            {
              title: 'Basic Info',
              children: [
                {
                  dataIndex: 'fullName',
                  title: 'Name',
                  render: handleNullableText,
                },
                {
                  dataIndex: 'email',
                  title: 'Email',
                  render: handleNullableText,
                },
                {
                  dataIndex: 'phoneNumber',
                  title: 'Phone',
                  render: handleNullableText,
                },
              ],
            },
          ]}
          loading={isLoading}
          rowKey="_id"
        />
      </CanAccess>
      <Divider />
      <JoinedOrdersTable record={contract} />
    </Show>
  );
}
