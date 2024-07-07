'use client';

import React, { useEffect, useState } from 'react';
import { Card, Divider, Form, FormProps, Input, Select, Switch } from 'antd';
import { UserRole } from '@core';
import { SerializedProductDto } from '@frontend/api-sdk';
import { TableTransfer } from '@components/transafer';

const SupplierForm = ({ formProps }: { formProps: FormProps }) => {
  return (
    <Form {...formProps} layout="vertical">
      <Card title="Basic Information">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Business Name" name="businessName">
          <Input />
        </Form.Item>
        <Form.Item initialValue={UserRole.SUPPLIER} label="Role" name="role">
          <Select
            placeholder="Select a role"
            options={[
              { label: 'Admin', value: UserRole.ADMIN },
              { label: 'Supplier', value: UserRole.SUPPLIER },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ message: 'Please enter password' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Active"
          name="active"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Card>
      <Divider />
      <Card title={'Associations'}>
        <Form.Item label="Products" name="products">
          <ProductsTransfer
            supplierProducts={formProps.initialValues?.products}
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

export default SupplierForm;

const ProductsTransfer = ({
  supplierProducts,
  onChange,
}: {
  supplierProducts: SerializedProductDto[];
  onChange: (keys: string[]) => void;
}) => {
  const [targetKeys, setTargetKeys] = useState(
    supplierProducts?.map((product) => product._id) || []
  );

  useEffect(() => {
    onChange(targetKeys);
  }, [targetKeys, onChange]);

  return (
    <TableTransfer
      resource={'products'}
      filterOption={(inputValue, item) =>
        item.fullName.toLowerCase().includes(inputValue.toLowerCase())
      }
      targetKeys={targetKeys}
      rowKey={(record) => record._id}
      showSelectAll={false}
      leftColumns={[
        {
          dataIndex: 'fullName',
          title: 'Name',
          sorter: true,
        },
        {
          dataIndex: 'totalRevenue',
          title: 'Total Revenue',
          sorter: true,
        },
        {
          dataIndex: 'totalOrders',
          title: 'Total Orders',
          sorter: true,
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
      ]}
      onChange={(keys) => {
        setTargetKeys(keys);
        onChange(keys);
      }}
    />
  );
};
