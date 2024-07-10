'use client';

import React, { useEffect, useState } from 'react';
import { Card, Divider, Form, FormProps, Input, Select, Switch } from 'antd';
import { SerializedProductDto } from '@frontend/api-sdk';
import { useSelect } from '@refinedev/antd';
import { TransferProducts } from '@components/transfer-products';
import { FillProducts } from '@components/fill-products';

const FillRequestForm = ({ formProps }: { formProps: FormProps }) => {
  const { selectProps } = useSelect({
    resource: 'machines',
    optionLabel: 'description',
    optionValue: '_id',
  });

  return (
    <Form {...formProps} resource="requests" layout="vertical">
      <Card title="Request Details">
        <Form.Item
          label="Machine"
          name={['machine', '_id']}
          initialValue={formProps.initialValues?._id}
          rules={[{ required: true, message: 'Please select a machine' }]}
        >
          <Select {...selectProps} placeholder="Select a machine" />
        </Form.Item>
        <Form.Item label="Notes" name="notes">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Send Email"
          name="sendEmail"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Card>
      <Divider />
      <Card title={'Products'}>
        <Form.Item name="products">
          <FillProducts
            initTargetKeys={formProps.initialValues?.products}
            onChange={(products) => {
              console.log({ products });
              formProps?.form?.setFieldsValue({
                products: products.map((p) => ({
                  product: { _id: p._id },
                  quantity: p.quantity,
                })),
              });
            }}
          />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default FillRequestForm;

const ProductsTransfer = ({
  onChange,
  fillRequestProducts,
}: {
  onChange: (values: any) => void;
  fillRequestProducts: SerializedProductDto[];
}) => {
  const [productQuantities, setProductQuantities] = useState<
    {
      _id: string;
      quantity: number;
    }[]
  >([]);

  useEffect(() => {
    onChange(productQuantities);
  }, [onChange, productQuantities]);

  const handleChange = (keys: any[]) => {
    setProductQuantities(
      keys.map((key) => ({
        _id: key,
        quantity: 1,
      }))
    );
  };

  return (
    <TransferProducts
      targetKeys={productQuantities.map((p) => p._id)}
      rowKey={(record) => record._id}
      showSelectAll={false}
      leftColumns={[
        {
          dataIndex: 'fullName',
          title: 'Name',
        },
        {
          dataIndex: 'totalRevenue',
          title: 'Total Revenue',
        },
        {
          dataIndex: 'totalOrders',
          title: 'Total Orders',
        },
        {
          dataIndex: ['supplier', 'fullName'],
          title: 'Supplier',
        },
      ]}
      rightColumns={[
        {
          dataIndex: 'fullName',
          title: 'Name',
        },
        {
          dataIndex: 'totalRevenue',
          title: 'Total Revenue',
        },
        {
          dataIndex: 'totalOrders',
          title: 'Total Orders',
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
                setProductQuantities((prev) => [
                  ...prev.filter((p) => p._id !== record._id),
                  { _id: record._id, quantity: parseInt(e.target.value) },
                ])
              }
            />
          ),
        },
      ]}
      onChange={handleChange}
    />
  );
};
