import { Table, Typography } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ISerializedBrand } from '@core';
import { handleMagextImage } from '@app/products/utils/handleMagextImage';
import { defaultSrc } from '@app/config';
import { handleEmptyString } from '@helpers';

export const JoinedBrandsTable = ({
  record,
}: {
  record: {
    brands: ISerializedBrand[];
  };
}) => {
  const router = useRouter();

  // If the record has brands but the first product does not have an _id,
  // set the brands to an empty array because it's false data
  if (record.brands.length && !record.brands[0]._id) record.brands = [];

  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 16 }}>
        {'Brands'}
      </Typography.Title>
      <Table
        pagination={{ pageSize: 5 }}
        dataSource={record.brands}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/brands/show/${record._id}`);
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
