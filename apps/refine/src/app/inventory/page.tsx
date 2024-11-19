'use client';

import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';
import { Table, Tag, Typography } from 'antd';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { useRouter } from 'next/navigation';

const expandableColumns = [
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
      <Typography.Paragraph ellipsis={{ rows: 2 }}>{text}</Typography.Paragraph>
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
    render: (_: any, record: { current_stock: number; max_stock: number }) => {
      const fill = record.max_stock - record.current_stock;
      return <Typography.Text>{fill}</Typography.Text>;
    },
  },
  {
    title: 'Stock Utilization',
    key: 'utilization',
    render: (_: any, record: { current_stock: number; max_stock: number }) => {
      const utilization =
        record.max_stock > 0
          ? ((record.current_stock / record.max_stock) * 100).toFixed(2)
          : '0.00';
      return <Typography.Text>{utilization}% utilized</Typography.Text>;
    },
  },
];

export default function InventoryList() {
  const router = useRouter();

  const expandedRowRender = (record) => (
    <Table
      dataSource={record.inventory}
      columns={expandableColumns}
      onRow={(record) => ({
        onClick: () => router.push(`/machines/show/${record.machine_id}`),
        style: { cursor: 'pointer' },
      })}
      pagination={false}
      rowKey="machine_id"
    />
  );

  return (
    <QuickTableSection
      pageTitle="Inventory"
      resource="products"
      showActions={false}
      expandable={{ expandedRowRender }}
      onRow={(record) => ({
        onClick: () => router.push(`/products/show/${record._id}`),
        style: { cursor: 'pointer' },
      })}
      meta={{
        join: [
          {
            field: 'supplier',
            select: ['_id', 'fullName'],
          },
        ],
      }}
      sorters={{
        initial: [
          {
            field: 'inventory',
            order: 'desc',
          },
        ],
      }}
      // filters={{
      //   permanent: [
      //     {
      //       field: 'totalOrders',
      //       operator: 'ne',
      //       value: 0,
      //     },
      //   ],
      // }}
      columns={[
        {
          title: 'Basic Info',
          children: [
            {
              dataIndex: 'productPictures',
              title: 'Image',
              render: (productPictures) =>
                handleMagextImage(productPictures?.[0]),
            },
            {
              dataIndex: 'fullName',
              title: 'Name',
              sorter: true,
            },
            {
              dataIndex: 'upc',
              title: 'UPC',
              sorter: true,
            },
          ],
        },
        {
          title: 'Inventory',
          children: [
            {
              dataIndex: 'inventory',
              title: 'Machines',
              render: (inventory) =>
                inventory?.length ? (
                  <Typography.Text>{inventory.length} machines</Typography.Text>
                ) : (
                  'No Inventory'
                ),
            },
            {
              title: 'Current Stock',
              dataIndex: 'inventory',
              key: 'current_stock',
              render: (inventory) => {
                const value = inventory?.reduce(
                  (acc, item) => acc + item.current_stock,
                  0
                );
                return (
                  <Tag color={value > 0 ? 'blue' : 'volcano'}>{value}</Tag>
                );
              },
            },
            {
              title: 'Max Stock',
              dataIndex: 'inventory',
              key: 'max_stock',
              render: (inventory) => {
                const value = inventory?.reduce(
                  (acc, item) => acc + item.max_stock,
                  0
                );
                return <Tag color={value > 50 ? 'green' : 'red'}>{value}</Tag>;
              },
            },
            {
              title: 'Fill',
              key: 'fill',
              render: (_, record) => {
                const value = record.inventory?.reduce(
                  (acc, item) => acc + item.max_stock - item.current_stock,
                  0
                );
                return <Typography.Text>{value}</Typography.Text>;
              },
            },
            {
              title: 'Stock Utilization',
              key: 'utilization',
              render: (_, record) => {
                const currentStock = record.inventory?.reduce(
                  (acc, item) => acc + item.current_stock,
                  0
                );
                const maxStock = record.inventory?.reduce(
                  (acc, item) => acc + item.max_stock,
                  0
                );
                const utilization =
                  maxStock > 0
                    ? ((currentStock / maxStock) * 100).toFixed(0)
                    : '0.00';
                return (
                  <Typography.Text>{utilization}% utilized</Typography.Text>
                );
              },
            },
            {
              title: 'Stock Status',
              key: 'stock_status',
              render: (_, record) => {
                const currentStock = record.inventory?.reduce(
                  (acc, item) => acc + item.current_stock,
                  0
                );
                const maxStock = record.inventory?.reduce(
                  (acc, item) => acc + item.max_stock,
                  0
                );
                const utilization =
                  maxStock > 0 ? (currentStock / maxStock) * 100 : 0;
                if (utilization < 50) {
                  return <Tag color="red">Low Stock</Tag>;
                }
                if (utilization >= 50 && utilization < 80) {
                  return <Tag color="orange">Medium Stock</Tag>;
                }
                return <Tag color="green">High Stock</Tag>;
              },
            },
          ],
        },
      ]}
    />
  );
}
