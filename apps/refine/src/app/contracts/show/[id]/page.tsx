'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  message,
  Popconfirm,
  PopconfirmProps,
  Space,
  Spin,
  Typography,
} from 'antd';
import { CanAccess, useGetIdentity, useShow } from '@refinedev/core';
import {
  formatFileSize,
  formatPrice,
  formatTime,
  handleEmptyString,
} from '@helpers';
import { Show, TextField } from '@refinedev/antd';
import { FeeType, IUserEntity, UserRole } from '@core';
import { JoinedOrdersTable } from '@components/joined-orders.table';
import { JoinedPaymentsTable } from '@components/joined-payments.table';
import { useRouter } from 'next/navigation';
import { DownloadOutlined } from '@ant-design/icons';
import PDFSVGComponent from '@app/contracts/pdf-svg';
import { vndClient } from '@providers/api';

const { Title } = Typography;

export default function ContractShow() {
  const { queryResult } = useShow({
    meta: {
      join: [
        {
          field: 'supplier',
        },
        {
          field: 'files',
        },
        {
          field: 'payments',
        },
      ],
    },
  });
  const [refreshPayments, setRefreshPayments] = useState(0); // State to manage re-rendering
  const { data: currentUser } = useGetIdentity<IUserEntity>();
  const isSupplier = currentUser?.role === UserRole.SUPPLIER;

  const { data, isLoading, refetch } = queryResult;
  if (isLoading) {
    return (
      <Spin
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }
  const router = useRouter();

  const contract = data?.data;
  if (!contract) {
    return null;
  }

  const handlePreview = (fileUrl) => {
    // Implement preview logic here
    window.open(fileUrl, '_blank');
  };

  const payRevenue = () => {
    vndClient.payments
      .createOne({
        requestBody: {
          amount_paid: contract.totalDue,
          amount_gained: contract.activeRevenue,
          contract: { _id: contract._id },
          supplier: { _id: contract.supplier_id },
        },
      })
      .then(() => {
        message.success('Revenue Paid Successfully');
        refetch(); // Refetch the contract data after payment is created
        setRefreshPayments((prev) => ++prev); // Toggle the state to trigger a re-render
      });
    // console.log('hibye');
  };
  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    payRevenue();
    // message.success('Click on Yes');
  };

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
            value={`${Number(contract.feePerSale).toFixed(3)} ${
              contract.feeType === FeeType.PERCENTAGE ? ' %' : ' KD'
            }`}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Orders">
          <TextField value={contract.orders.length} />
        </Descriptions.Item>
        <Descriptions.Item label="Total Sales">
          <TextField value={formatPrice(contract.totalSales)} />
        </Descriptions.Item>
        {!isSupplier && (
          <Descriptions.Item label="Total Revenue">
            <TextField value={formatPrice(contract.totalRevenue)} />
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Due">
          <TextField value={formatPrice(contract.totalDue)} />
        </Descriptions.Item>
        {!isSupplier && (
          <Descriptions.Item label="Profit">
            <TextField value={formatPrice(contract.activeRevenue)} />
          </Descriptions.Item>
        )}

        <Descriptions.Item
          label={isSupplier ? 'Total Gain' : 'Total Paid in Contract'}
        >
          <TextField value={formatPrice(contract.totalPaidInContract)} />
        </Descriptions.Item>
        {!isSupplier && (
          <Descriptions.Item label="Total Profit in Contract">
            <TextField value={formatPrice(contract.totalGainInContract)} />
          </Descriptions.Item>
        )}
      </Descriptions>
      <CanAccess action="show" resource="suppliers">
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '24px',
            }}
          >
            <Popconfirm
              title="Pay Revenue"
              description="Are you sure to Supplier Active Revenue Now?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button disabled={contract.totalDue == 0} type="primary">
                Pay Revenue
              </Button>
            </Popconfirm>
          </div>
        </>
      </CanAccess>
      <Divider />
      <Title level={3}>{'Files'}</Title>
      <Space wrap direction="horizontal" style={{ width: '100%' }}>
        {contract.files.map((file, index) => (
          <Card key={index} style={{ width: 400 }}>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Space>
                <PDFSVGComponent
                  style={{
                    width: 48,
                    height: 48,
                    margin: '0 auto',
                    display: 'block',
                  }}
                />
                <Typography.Text>{file.originalname}</Typography.Text>
              </Space>

              <Button
                type="link"
                icon={<DownloadOutlined />}
                onClick={() => handlePreview(file.url)}
              />
            </Space>

            <Divider />
            <Space
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography.Text
                style={{
                  opacity: 0.5,
                  fontSize: 13,
                }}
              >
                {formatFileSize(file.size)}
              </Typography.Text>
              <Typography.Text
                style={{
                  opacity: 0.5,
                  fontSize: 13,
                }}
              >
                {formatTime(file.createdAt)}
              </Typography.Text>
            </Space>
          </Card>
        ))}
      </Space>
      <Divider />
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
      <JoinedOrdersTable
        useTableProps={{
          meta: {
            join: [
              {
                field: 'machine',
              },
              {
                field: 'products',
              },
              {
                field: 'products.product',
              },
            ],
          },
          filters: {
            permanent: [
              {
                field: 'createdAt',
                operator: 'gte',
                value: contract.startDate,
              },
              {
                field: 'createdAt',
                operator: 'lte',
                value: contract.endDate,
              },
              {
                field: 'products.product.supplier_id',
                operator: 'eq',
                value: contract.supplier._id,
              },
            ],
          },
        }}
      />
      <JoinedPaymentsTable
        key={refreshPayments}
        useTableProps={{
          filters: {
            permanent: [
              {
                field: 'contract_id',
                operator: 'eq',
                value: contract._id,
              },
            ],
          },
        }}
      ></JoinedPaymentsTable>
    </Show>
  );
}
