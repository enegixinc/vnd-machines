'use client';

import React from 'react';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Space,
  Spin,
  Typography,
} from 'antd';
import { CanAccess, useShow } from '@refinedev/core';
import {
  formatFileSize,
  formatPrice,
  formatTime,
  handleEmptyString,
} from '@helpers';
import { Show, TextField } from '@refinedev/antd';
import { FeeType } from '@core';
import { JoinedOrdersTable } from '@components/joined-orders.table';
import { useRouter } from 'next/navigation';
import { DownloadOutlined } from '@ant-design/icons';
import PDFSVGComponent from '@app/contracts/pdf-svg';

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
      ],
    },
  });

  const { data, isLoading } = queryResult;
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
        <Descriptions.Item label="Sales">
          <TextField value={formatPrice(contract.totalSales)} />
        </Descriptions.Item>
        <Descriptions.Item label="Revenue">
          <TextField value={formatPrice(contract.totalRevenue)} />
        </Descriptions.Item>
      </Descriptions>
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
    </Show>
  );
}
