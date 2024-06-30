import { Card, Table, Typography } from 'antd';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import React from 'react';
import { SerializedProductDto } from '@frontend/api-sdk';
import { useRouter } from 'next/navigation';

export const JoinedProductsTable = ({
  record,
}: {
  record: {
    products: SerializedProductDto[];
  };
}) => {
  const router = useRouter();

  // If the record has products but the first product does not have an _id,
  // set the products to an empty array because it's false data
  if (record.products.length && !record.products[0]._id) record.products = [];

  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 16 }}>
        {'Products'}
      </Typography.Title>
      <Table
        pagination={{ pageSize: 5 }}
        dataSource={record.products}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/products/show/${record._id}`);
            },
            style: { cursor: 'pointer' },
          };
        }}
        columns={[
          {
            dataIndex: 'productPictures',
            title: 'Image',
            render: handleMagextImage,
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
          {
            dataIndex: 'price',
            title: 'Price',
            sorter: true,
            render: (price) => `${Number(price).toFixed(1)} KD`,
          },
          {
            dataIndex: 'totalSoldProducts',
            title: 'Total Sold Products',
            sorter: true,
          },
          {
            dataIndex: 'totalOrders',
            title: 'Total Orders',
            sorter: true,
          },
          {
            dataIndex: 'totalRevenue',
            title: 'Total Revenue',
            sorter: true,
          },
        ]}
      />
    </>
  );
};
