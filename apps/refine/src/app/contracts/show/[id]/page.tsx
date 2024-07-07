'use client';

import React from 'react';
import { Descriptions, Divider, Typography } from 'antd';
import { CanAccess, useShow } from '@refinedev/core';
import { handleEmptyString } from '@helpers';
import { Show, TextField } from '@refinedev/antd';
import { FeeType } from '@core';
import { JoinedOrdersTable } from '@components/joined-orders.table';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

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
        <Title level={3}>{'Supplier Details'}</Title>
        <Descriptions
          bordered
          column={2}
          labelStyle={{
            fontWeight: 'bold',
            width: '20%',
          }}
        >
          <Descriptions.Item label="Full Name">
            <TextField value={contract.supplier.fullName} />
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <TextField
              onClick={() => {
                router.push(`/suppliers/show/${contract.supplier._id}`);
              }}
              style={{ cursor: 'pointer', color: '#1677ff' }}
              value={contract.supplier.email}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            <TextField value={contract.supplier.phoneNumber} />
          </Descriptions.Item>
          <Descriptions.Item label="Business Name">
            <TextField value={contract.supplier.businessName || 'N/A'} />
          </Descriptions.Item>
        </Descriptions>
      </CanAccess>
      <Divider />
      <JoinedOrdersTable record={contract} />
    </Show>
  );
}
