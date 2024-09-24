import { Table, Tag, Typography } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';

export const InventoryTable = ({
  dataSource,
}: {
  dataSource: Array<{
    machine_id: string;
    machine_name: string;
    machine_description: string;
    max_stock: number;
    current_stock: number;
  }>;
}) => {
  const router = useRouter();

  const columns = [
    {
      title: 'Machine Name',
      dataIndex: 'machine_name',
      key: 'machine_name',
      render: (text: string, record: { machine_id: string }) => (
        <Typography.Text style={{ color: '#1890ff' }}>{text}</Typography.Text>
      ),
    },
    {
      title: 'Machine Description',
      dataIndex: 'machine_description',
      key: 'machine_description',
      render: (text: string) => (
        <Typography.Paragraph ellipsis={{ rows: 2 }}>
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Current Stock',
      dataIndex: 'current_stock',
      key: 'current_stock',
      sorter: (a: { current_stock: number }, b: { current_stock: number }) =>
        a.current_stock - b.current_stock,
      render: (stock: number) => (
        <Tag color={stock > 0 ? 'blue' : 'volcano'}>{stock}</Tag>
      ),
    },
    {
      title: 'Max Stock',
      dataIndex: 'max_stock',
      key: 'max_stock',
      sorter: (a: { max_stock: number }, b: { max_stock: number }) =>
        a.max_stock - b.max_stock,
      render: (stock: number) => (
        <Tag color={stock > 50 ? 'green' : 'red'}>{stock}</Tag>
      ),
    },
    {
      title: 'Fill',
      key: 'fill',
      render: (
        _: any,
        record: { current_stock: number; max_stock: number }
      ) => {
        const fill = record.max_stock - record.current_stock;

        return <Typography.Text>{fill}</Typography.Text>;
      },
    },
    {
      title: 'Stock Utilization',
      key: 'utilization',
      render: (
        _: any,
        record: { current_stock: number; max_stock: number }
      ) => {
        const utilization = (
          (record.current_stock / record.max_stock) *
          100
        ).toFixed(2);
        return <Typography.Text>{utilization}% utilized</Typography.Text>;
      },
    },
  ];

  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 16 }}>
        Inventory
      </Typography.Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        onRow={(record) => ({
          onClick: () => {
            router.push(`/machines/show/${record.machine_id}`);
          },
          style: { cursor: 'pointer' },
        })}
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record.machine_id}
      />
    </>
  );
};
