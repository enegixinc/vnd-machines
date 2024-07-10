import React, { useEffect, useState } from 'react';
import { SerializedProductDto } from '@frontend/api-sdk';
import { vndClient } from '@providers/api';
import { NewTableTransfer } from '@components/new-transafer';
import { handleNullableFullName } from '@app/products/utils/handleNullableText';
import { Input, TransferProps } from 'antd';

export const FillProducts = ({
  onChange,
  initTargetKeys,
}: {
  initTargetKeys: string[];
  onChange: (products: { _id: string; quantity: number }[]) => void;
}) => {
  const [productsWithSupplier, setProductsWithSupplier] = useState<
    SerializedProductDto[]
  >([]);

  const [productQuantities, setProductQuantities] = useState<
    {
      _id: string;
      quantity: number;
    }[]
  >([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await vndClient.products.getMany({
        limit: 0,
        join: ['supplier'],
        filter: ['supplier._id||$notnull'],
      });

      setProductsWithSupplier(data as any);
    };

    fetchProducts();
  }, []);

  const _onChange: TransferProps['onChange'] = (
    nextTargetKeys,
    direction,
    moveKeys
  ) => {
    // @ts-ignore
    setProductQuantities((prevState) => {
      if (direction === 'right') {
        return [
          ...prevState,
          ...moveKeys.map((key) => ({
            _id: key,
            quantity: 1,
          })),
        ];
      } else {
        return prevState.filter((p) => !moveKeys.includes(p._id));
      }
    });
  };

  useEffect(() => {
    onChange(productQuantities);
  }, [productQuantities]);

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
      dataSource={productsWithSupplier}
      targetKeys={productQuantities.map((p) => p._id)}
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
        {
          dataIndex: 'quantity',
          title: 'Quantity',
          render: (text, record) => (
            <Input
              type="number"
              min={1}
              value={
                productQuantities.find((p) => p._id === record._id)?.quantity
              }
              onChange={(e) =>
                setProductQuantities((prevState) =>
                  prevState.map((p) =>
                    p._id === record._id
                      ? {
                          ...p,
                          quantity: parseInt(e.target.value, 10),
                        }
                      : p
                  )
                )
              }
            />
          ),
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
