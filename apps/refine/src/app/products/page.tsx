'use client';

import React from 'react';
import { handleEmptyString } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';
import { Divider } from 'antd';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';

export default function ProductsList() {
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
              dataIndex: ['supplier', 'fullName'],
              title: 'Supplier',
              render: handleEmptyString,
              onFilter(value, record) {
                return record.supplier === null;
              },
              filters: [
                {
                  text: 'No Supplier',
                  value: 'null',
                },
              ],
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
