'use client';

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { Space, Table } from 'antd';
import React from 'react';
import { SerializedProductDto } from '@frontend/api-sdk';
import { defaultSrc } from '@app/config';
import { handleEmptyString } from '@helpers';

export const handleProductImage = (
  value: SerializedProductDto['productPictures']
) => {
  const firstImage = value[0];
  const src = firstImage
    ? `https://devapi.point24h.com/api/thumbs/${firstImage}/tryvnd@point24h.com`
    : defaultSrc;

  return <img src={src} alt="product" width={50} height={50} />;
};

export default function ProductsList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      mode: 'server',
    },
    meta: {
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
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.ColumnGroup title="Basic Info">
          <Table.Column
            dataIndex="productPictures"
            title="Image"
            render={handleProductImage}
          />
          <Table.Column
            dataIndex={'fullName'}
            title="Name"
            render={handleEmptyString}
          />
          <Table.Column
            dataIndex="upc"
            title="UPC"
            sorter
            render={handleEmptyString}
          />
          <Table.Column
            dataIndex="price"
            title="Price"
            sorter
            render={(price) => `${Number(price).toFixed(2)} KD`}
          />
        </Table.ColumnGroup>

        <Table.ColumnGroup title="Associated">
          <Table.Column
            dataIndex={['supplier', 'fullName']}
            title="Supplier"
            render={handleEmptyString}
          />
          <Table.Column
            dataIndex={['category', 'fullName']}
            title="Category"
            render={handleEmptyString}
          />
          <Table.Column
            dataIndex={['brand', 'fullName']}
            render={handleEmptyString}
            title="Brand"
          />
        </Table.ColumnGroup>

        <Table.ColumnGroup title="Stock">
          <Table.Column
            dataIndex="totalSoldProducts"
            title="Total Sold Products"
            sorter={true}
          />
          <Table.Column
            dataIndex="totalOrders"
            title="Total Orders"
            sorter={true}
          />
          <Table.Column
            dataIndex="totalRevenue"
            title="Total Revenue"
            sorter={true}
          />
        </Table.ColumnGroup>
        <Table.Column<SerializedProductDto>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <ShowButton hideText size="small" recordItemId={record._id} />
              <DeleteButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
