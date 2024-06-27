'use client';

import React, { useEffect, useState } from 'react';
import { Card, Divider, Form, FormProps, Input, Select, Switch } from 'antd';
import { SerializedProductDto } from '@frontend/api-sdk';
import { vndClient } from '@providers/api';
import { TableTransfer } from '@components/transafer';
import { useSelect, useTable } from '@refinedev/antd';

const FillRequestForm = ({ formProps }: { formProps: FormProps }) => {
  const { selectProps } = useSelect({
    resource: 'machines',
    optionLabel: 'description',
    optionValue: '_id',
  });

  return (
    <Form {...formProps} layout="vertical">
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
          <ProductsTransfer
            onChange={(keys) => {
              formProps?.form?.setFieldsValue({
                products: keys.map((key) => ({ _id: key })),
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
}: {
  onChange: (keys: string[]) => void;
}) => {
  const { tableProps } = useTable({
    resource: 'products',
  });

  const [products, setProducts] = useState<Map<string, SerializedProductDto>>(
    new Map()
  );

  const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <TableTransfer
      dataSource={tableProps.dataSource}
      filterOption={(inputValue, item) =>
        item.fullName.toLowerCase().includes(inputValue.toLowerCase())
      }
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
              // value={quantities[record._id] || 1}
              // onChange={(e) =>
              //   handleQuantityChange(record._id, parseInt(e.target.value, 10))
            />
          ),
        },
      ]}
      // onChange={(keys) => {
      //   setTargetKeys(keys);
      //   onChange(keys);
    />
  );
};
