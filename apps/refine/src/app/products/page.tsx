'use client';

import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';
import { Divider } from 'antd';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { useRouter } from 'next/navigation';
import {handleNullableFullName} from "@app/products/utils/handleNullableText";

export default function ProductsList() {
  const router = useRouter();
  return (
    <QuickTableSection
      pageTitle="Products"
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
              render: (productPictures) =>
                handleMagextImage(productPictures[0]),
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
              dataIndex: 'supplier',
              title: 'Supplier',
              onCell: (record) => ({
                style: {
                  cursor: record.supplier && 'pointer',
                  color: record.supplier && '#1890ff',
                },
                onClick: () =>
                  router.push(`/suppliers/show/${record.supplier._id}`),
              }),
              render: handleNullableFullName,
            },
            {
              dataIndex: 'category',
              title: 'Category',
              onCell: (record) => ({
                style: {
                  cursor: record.category && 'pointer',
                  color: record.category && '#1890ff',
                },
                onClick: () =>
                  router.push(`/categories/show/${record.category._id}`),
              }),
              render: handleNullableFullName,
            },
            {
              dataIndex: 'brand',
              title: 'Brand',
              onCell: (record) => ({
                style: {
                  cursor: 'pointer',
                  color: '#1890ff',
                },
                onClick: () => router.push(`/brands/show/${record.brand._id}`),
              }),
              render: handleNullableFullName,
            },
          ],
        },
        {
          title: 'Finance',
          render: (_, __, index) => index === 0 && <Divider>Stock</Divider>,
          children: [
            {
              dataIndex: 'totalSales',
              title: 'Sales',
              sorter: true,
            },
            {
              dataIndex: 'totalRevenue',
              title: 'Revenue',
              sorter: true,
            },
          ],
        },
      ]}
    />
  );
}
