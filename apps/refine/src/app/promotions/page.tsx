'use client';

import React from 'react';
import { formatPercentage, formatPrice, handleEmptyString } from '@helpers';
import { QuickTableSection } from '@components/quick-table-section';
import { Tag, Tooltip, Typography } from 'antd';
import Link from 'next/link';

const { Text } = Typography;

export default function PromotionsList() {
  return (
    <QuickTableSection
      pageTitle="Promotions"
      resource="Promotions"
      meta={{
        join: [
          {
            field: 'machine',
            select: ['description'],
          },
        ],
      }}
      columns={[
        {
          dataIndex: 'title',
          title: 'Description',
          render: handleEmptyString,
        },
        {
          dataIndex: 'promoType',
          title: 'Type',
          render: (text) => <Tag color="blue">{handleEmptyString(text)}</Tag>,
        },
        {
          dataIndex: 'amount',
          title: 'Discount Amount',
          render: (amount, record) => (
            <Tooltip
              title={`Discount ${record.percentage ? 'Percentage' : 'Amount'}`}
            >
              {record.percentage
                ? formatPercentage(amount)
                : formatPrice(amount)}
            </Tooltip>
          ),
          sorter: true,
        },
        {
          title: 'Category/Products',
          render: ({ cateOrProd, isAllProducts }) => (
            <Text>
              {isAllProducts ? (
                <Tag color="green">All Products</Tag>
              ) : (
                handleEmptyString(
                  cateOrProd === 'prod' ? 'Products' : 'Categories'
                )
              )}
            </Text>
          ),
        },
        {
          title: 'Code/Department',
          render: (record) => (
            <Text>{handleEmptyString(record.code || record.department)}</Text>
          ),
        },
        {
          title: 'Machines',
          render: ({ machine, isAllMachines }) => {
            if (isAllMachines) {
              return <Tag color="green">All Machines</Tag>;
            } else {
              return machine.map((machine) => (
                <div key={machine._id}>
                  <Link href={`/machines/show/${machine._id}`}>
                    {machine.description}
                  </Link>
                </div>
              ));
            }
          },
        },
        {
          dataIndex: 'productsToBuy',
          title: 'Products To Buy',
          render: handleEmptyString,
        },
        {
          dataIndex: 'startDate',
          title: 'Start Date',
          render: (date) => new Date(date).toLocaleDateString(),
        },
        {
          dataIndex: 'endDate',
          title: 'End Date',
          render: (date) => new Date(date).toLocaleDateString(),
        },
        {
          dataIndex: 'active',
          title: 'Active',
          render: (active) =>
            active ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
          sorter: true,
        },
      ]}
    />
  );
}
