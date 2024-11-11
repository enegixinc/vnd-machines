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
            field: 'machines',
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
          dataIndex: 'cateOrProd',
          title: 'Category/Products',
          render: handleEmptyString,
        },
        {
          title: 'Code/Department',
          render: (record) => (
            <Text>{handleEmptyString(record.code || record.department)}</Text>
          ),
        },
        {
          dataIndex: 'machines',
          title: 'Machines',
          render: (machines) =>
            machines.map((machine) => (
              <div key={machine._id}>
                <Link href={`/machines/show/${machine._id}`}>
                  {machine.description}
                </Link>
              </div>
            )),
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
