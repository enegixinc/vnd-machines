import { Table, Typography } from 'antd';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import React from 'react';
import { SerializedProductDto } from '@frontend/api-sdk';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@helpers';

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
        pagination={{ pageSize: 5, total: record.products.length }}
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
            render: (images) => handleMagextImage(images[0]),
          },
          {
            dataIndex: 'fullName',
            title: 'Name',
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
          },
          {
            dataIndex: 'upc',
            title: 'UPC',
          },
          {
            dataIndex: 'price',
            title: 'Price',
            sorter: (a, b) => a.price - b.price,
            render: formatPrice,
          },
          {
            dataIndex: 'totalSoldProducts',
            title: 'Total Sold Products',
            sorter: (a, b) => a.totalSoldProducts - b.totalSoldProducts,
          },
          {
            dataIndex: 'totalOrders',
            title: 'Total Orders',
            sorter: (a, b) => a.totalOrders - b.totalOrders,
          },
          {
            dataIndex: 'totalRevenue',
            title: 'Total Revenue',
            sorter: (a, b) => a.totalRevenue - b.totalRevenue,
            render: formatPrice,
          },
        ]}
      />
    </>
  );
};
