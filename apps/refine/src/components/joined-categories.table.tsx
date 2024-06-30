import { Table, Typography } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ISerializedBrand, ISerializedCategory } from '@core';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { defaultSrc } from '@app/config';
import { handleEmptyString } from '@helpers';

export const JoinedCategoriesTable = ({
  record,
}: {
  record: {
    categories: ISerializedCategory[];
  };
}) => {
  const router = useRouter();

  // If the record has categories but the first product does not have an _id,
  // set the categories to an empty array because it's false data
  if (record.categories.length && !record.categories[0]._id)
    record.categories = [];

  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 16 }}>
        {'Categories'}
      </Typography.Title>
      <Table
        pagination={{ pageSize: 5 }}
        dataSource={record.categories}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/categories/show/${record._id}`);
            },
            style: { cursor: 'pointer' },
          };
        }}
        columns={[
          {
            dataIndex: 'logo',
            title: 'Logo',
            render: (logo) => <img src={defaultSrc} alt="logo" width={34} />,
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
        ]}
      />
    </>
  );
};
