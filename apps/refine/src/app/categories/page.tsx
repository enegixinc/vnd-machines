'use client';

import React from 'react';
import { formatPrice, handleEmptyString } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { useGetIdentity } from '@refinedev/core';
import { IUserEntity, UserRole } from '@core';
import { totalSupplierRevenue } from './helpers';

export default function CategoriesList() {
  const userRole = useGetIdentity<IUserEntity>()?.data?.role;

  const isAdmin = userRole === UserRole.ADMIN;

  return isAdmin ? (
    <QuickTableSection
      pageTitle="Categories"
      resource="categories"
      columns={[
        {
          dataIndex: 'categoryPicture',
          title: 'Picture',
          render: handleMagextImage,
        },
        {
          dataIndex: ['name', 'en'],
          title: 'Name (English)',
          render: handleEmptyString,
        },
        {
          dataIndex: ['name', 'ar'],
          title: 'Name (Arabic)',
          render: handleEmptyString,
        },
        {
          dataIndex: 'totalSoldProducts',
          title: 'Sold Products',
          sorter: true,
        },
        {
          dataIndex: 'totalOrders',
          title: 'Orders',
          sorter: true,
        },
        {
          dataIndex: 'totalRevenue',
          title: 'Revenue',
          sorter: true,
          render: formatPrice,
        },
      ]}
    />
  ) : (
    <QuickTableSection
      pageTitle="Categories"
      resource="categories"
      columns={[
        {
          dataIndex: 'categoryPicture',
          title: 'Picture',
          render: handleMagextImage,
        },
        {
          dataIndex: ['name', 'en'],
          title: 'Name (English)',
          render: handleEmptyString,
        },
        {
          dataIndex: ['name', 'ar'],
          title: 'Name (Arabic)',
          render: handleEmptyString,
        },
        {
          title: 'Sold Products',
          sorter: true,
          render: (category) =>
            category.products.reduce(
              (acc, product) => acc + product.totalSoldProducts,
              0
            ),
        },
        {
          title: 'Orders',
          sorter: true,
          render: (category) =>
            category.products.reduce(
              (acc, product) => acc + product.totalOrders,
              0
            ),
        },
        {
          title: 'Revenue',
          sorter: true,
          render: (category) => formatPrice(totalSupplierRevenue(category)),
        },
      ]}
    />
  );
}
