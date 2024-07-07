'use client';

import React from 'react';
import { QuickTableSection } from '@components/quick-table-section';
import { Divider } from 'antd';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { useRouter } from 'next/navigation';
import { handleNullableFullName } from '@app/products/utils/handleNullableText';
import { formatPrice } from '@helpers';

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
              render: formatPrice,
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
                  cursor: record.supplier?._id && 'pointer',
                  color: record.supplier?._id && '#1890ff',
                },
                onClick: () => {
                  if (record.supplier?._id)
                    router.push(`/suppliers/show/${record.supplier._id}`);
                },
              }),
              render: handleNullableFullName,
            },
            {
              dataIndex: 'category',
              title: 'Category',
              onCell: (record) => ({
                style: {
                  cursor: record.category?._id && 'pointer',
                  color: record.category?._id && '#1890ff',
                },
                onClick: () => {
                  if (record.category?._id)
                    router.push(`/categories/show/${record.category._id}`);
                },
              }),
              render: handleNullableFullName,
            },
            {
              dataIndex: 'brand',
              title: 'Brand',
              onCell: (record) => ({
                style: {
                  cursor: record.brand?._id && 'pointer',
                  color: record.brand?._id && '#1890ff',
                },
                onClick: () => {
                  if (record.brand?._id)
                    router.push(`/brands/show/${record.brand._id}`);
                },
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
              render: formatPrice,
            },
            {
              dataIndex: 'totalRevenue',
              title: 'Revenue',
              sorter: true,
              render: formatPrice,
            },
          ],
        },
      ]}
    />
  );
}
