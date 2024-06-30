import React from 'react';
import { Card } from 'antd';
import dayjs from 'dayjs';
import { QuickTableSection } from '@components/quick-table-section';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { BiCategoryAlt } from 'react-icons/bi';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import './top-products.module.css';
import { handleNullableFullName } from '@app/products/utils/handleNullableText';

dayjs.extend(relativeTime);

export const TopProductsTable: React.FC<{ limit?: number }> = ({
  limit = 5,
}) => {
  const router = useRouter();

  return (
    <Card
      styles={{
        body: {
          padding: 0,
          margin: 0,
        },
      }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <BiCategoryAlt />
          <span>Top Products</span>
        </div>
      }
    >
      <QuickTableSection
        resource={'products'}
        showActions={false}
        pagination={false}
        showSearch={false}
        minimal
        useTableProps={{
          pagination: {
            mode: 'off',
          },
          sorters: {
            permanent: [
              {
                field: 'totalSoldProducts',
                order: 'desc',
              },
            ],
          },

          meta: {
            join: [
              { field: 'machines' },
              {
                field: 'supplier',
              },
              {
                field: 'category',
              },
              {
                field: 'brand',
              },
              {
                field: 'orders',
                select: ['createdAt'],
                limit: 1,
              },
            ],
            limit,
          },
        }}
        columns={[
          {
            title: 'Product',
            dataIndex: 'productPictures',
            render: (productPictures) => handleMagextImage(productPictures[0]),
          },
          {
            title: 'UPC',
            dataIndex: 'upc',
            onCell: (record) => ({
              onClick: () => router.push(`/products/show/${record._id}`),
              style: {
                cursor: 'pointer',
                color: '#1890ff',
              },
            }),
          },
          {
            title: 'Supplier',
            dataIndex: 'supplier',
            onCell: (record) => ({
              onClick: () =>
                router.push(`/supplier/show/${record.supplier._id}`),
              style: {
                cursor: record.supplier._id && 'pointer',
                color: record.supplier._id && '#1890ff',
              },
            }),
            render: handleNullableFullName,
          },
          {
            title: 'Total Sold',
            dataIndex: 'totalSoldProducts',
          },
          {
            title: 'Revenue',
            dataIndex: 'totalRevenue',
            render: (total, record) => `${total} KD`,
          },
          {
            title: 'Last Order',
            dataIndex: ['orders', 0, 'createdAt'],
            render: (date) => dayjs(date).fromNow(),
          },
        ]}
      />
    </Card>
  );
};
