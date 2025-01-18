import React, { useEffect, useState } from 'react';
import { Card, Tag } from 'antd';
import { QuickTableSection } from '@components/quick-table-section';
import { useRouter } from 'next/navigation';
import { BiCategoryAlt } from 'react-icons/bi';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import './top-products.module.css';
import { handleNullableFullName } from '@app/products/utils/handleNullableText';
import { formatPrice } from '@helpers';
import { vndClient } from '@providers/api';

export const TopProductsTable: React.FC<{ limit?: number }> = ({
  limit = 10,
}) => {
  const router = useRouter();
  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    const fetchProductsCount = async () => {
      try {
        const { total } = await vndClient.products.getMany({
          limit: 1,
        });
        setProductsCount(total);
      } catch (error) {
        console.error('Failed to fetch products count:', error);
      }
    };
    fetchProductsCount();
  }, []);

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
          <Tag color="blue">{productsCount}</Tag>
        </div>
      }
    >
      <QuickTableSection
        resource={'products'}
        showActions={false}
        pagination={false}
        showSearch={false}
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
              { field: 'supplier' },
              // {
              //   field: 'orders',
              //   select: ['createdAt'],
              //   limit: 1,
              // },
            ],
            limit,
          },
        }}
        minimal
        onRow={(record) => ({
          onClick: () => router.push(`/products/show/${record._id}`),
          style: { cursor: 'pointer' },
        })}
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
              onClick: (e) => {
                if (record?.supplier?._id) {
                  e.stopPropagation();
                }
                router.push(`/suppliers/show/${record?.supplier?._id}`);
              },
              style: {
                cursor: record?.supplier?._id && 'pointer',
                color: record?.supplier?._id && '#1890ff',
              },
            }),
            render: handleNullableFullName,
          },
          {
            title: 'Orders',
            dataIndex: 'totalOrders',
          },
          {
            title: 'Sales',
            dataIndex: 'totalSales',
            render: formatPrice,
          },
          {
            title: 'Revenue',
            dataIndex: 'totalRevenue',
            render: formatPrice,
          },
          // {
          //   title: 'Last Order',
          //   dataIndex: ['orders', 0, 'createdAt'],
          //   render: formatTime,
          // },
        ]}
      />
    </Card>
  );
};
