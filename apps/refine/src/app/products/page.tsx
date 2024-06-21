'use client';

import React from 'react';
import { handleEmptyString } from '@helpers';
import { QuickTable } from '@components/quick-table';
import { SerializedProductDto } from '@frontend/api-sdk';
import { defaultSrc } from '@app/config';
import { Divider } from 'antd';
import Search from 'antd/es/input/Search';

export const handleProductImage = (
  value: SerializedProductDto['productPictures']
) => {
  const firstImage = value[0];
  const src = firstImage
    ? `https://devapi.point24h.com/api/thumbs/${firstImage}/tryvnd@point24h.com`
    : defaultSrc;

  return <img src={src} alt="product" width={50} height={50} />;
};

export default function ProductsList() {
  return (
    <QuickTable
      title="Products"
      resource="products"
      meta={{
        join: [
          {
            field: 'category',
            select: ['_id', 'fullName'],
          },
          {
            field: 'brand',
            select: ['_id', 'fullName'],
          },
          {
            field: 'supplier',
            select: ['_id', 'fullName'],
          },
        ],
      }}
      columns={[
        {
          title: 'Basic Info',
          render: (_, __, index) =>
            index === 0 && <Divider>Basic Info</Divider>,
          children: [
            {
              dataIndex: 'productPictures',
              title: 'Image',
              render: handleProductImage,
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
              render: (price) => `${Number(price).toFixed(2)} KD`,
            },
          ],
        },
        {
          title: 'Associations',
          children: [
            {
              dataIndex: ['supplier', 'fullName'],
              title: 'Supplier',
              render: handleEmptyString,
            },
            {
              dataIndex: ['category', 'fullName'],
              title: 'Category',
              render: handleEmptyString,
            },
            {
              dataIndex: ['brand', 'fullName'],
              title: 'Brand',
              render: handleEmptyString,
            },
          ],
        },
        {
          title: 'Stock',
          render: (_, __, index) => index === 0 && <Divider>Stock</Divider>,
          children: [
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
          ],
        },
      ]}
    />
  );
}
