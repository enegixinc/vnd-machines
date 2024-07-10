import React, { useEffect, useState } from 'react';
import { SerializedProductDto } from '@frontend/api-sdk';
import { vndClient } from '@providers/api';
import { NewTableTransfer } from '@components/new-transafer';
import { handleNullableFullName } from '@app/products/utils/handleNullableText';
import { TransferProps } from 'antd';

export const TransferProducts = ({
  onChange,
  initTargetKeys,
}: {
  initTargetKeys: string[];
  onChange: TransferProps['onChange'];
}) => {
  const [productsWithNoSupplier, setProductsWithNoSupplier] = useState<
    SerializedProductDto[]
  >([]);
  const [targetKeys, setTargetKeys] = useState<string[]>(initTargetKeys);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await vndClient.products.getMany({
        limit: 0,
        join: ['supplier'],
      });
      console.log({ data });

      setProductsWithNoSupplier(data as any);
    };

    fetchProducts();
  }, []);

  const _onChange: TransferProps['onChange'] = (
    nextTargetKeys,
    direction,
    moveKeys
  ) => {
    setTargetKeys(nextTargetKeys as string[]);
    if (onChange) {
      onChange(nextTargetKeys, direction, moveKeys);
    }
  };

  return (
    <NewTableTransfer
      showSearch
      onChange={_onChange}
      filterOption={(inputValue, item) => {
        return item.searchableText
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      }}
      rowKey={(record) => record._id}
      dataSource={productsWithNoSupplier}
      targetKeys={targetKeys}
      rightColumns={[
        {
          dataIndex: 'fullName',
          title: 'Name',
        },
        {
          dataIndex: 'totalRevenue',
          title: 'Total Revenue',
          sorter: (a, b) => a.totalRevenue - b.totalRevenue,
        },
        {
          dataIndex: 'totalOrders',
          title: 'Total Orders',
          sorter: (a, b) => a.totalOrders - b.totalOrders,
        },
        {
          dataIndex: 'supplier',
          title: 'Supplier',
          render: handleNullableFullName,
        },
      ]}
      leftColumns={[
        {
          dataIndex: 'fullName',
          title: 'Name',
        },
        {
          dataIndex: 'totalRevenue',
          title: 'Total Revenue',
          sorter: (a, b) => a.totalRevenue - b.totalRevenue,
        },
        {
          dataIndex: 'totalOrders',
          title: 'Total Orders',
          sorter: (a, b) => a.totalOrders - b.totalOrders,
        },
        {
          dataIndex: 'supplier',
          title: 'Supplier',
          render: handleNullableFullName,
        },
      ]}
    />
  );
};
