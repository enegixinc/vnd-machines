'use client';

import React from 'react';
import { Card, Divider, Form, Input, Select, Switch } from 'antd';
import { UserRole } from '@core';
import { SerializedProductDto, UserEntity } from '@frontend/api-sdk';
import { vndClient } from '@providers/api';
import { TableTransfer } from '@app/suppliers/transafer';

const SupplierForm = ({ formProps }: { formProps: UserEntity }) => {
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
          rules={[{ required: true, message: 'Please enter password' }]}
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
      <ProductsTransfer supplierProducts={formProps.initialValues?.products} />
    </Form>
  );
};

export default SupplierForm;

const ProductsTransfer = async ({
  supplierProducts,
}: {
  supplierProducts: SerializedProductDto[];
}) => {
  const { data } = await vndClient.products.getMany({
    limit: 1000,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Card title={'Associations'}>
      <Form.Item label="Products" name="products">
        <TableTransfer
          dataSource={data}
          rowKey={(record) => record._id}
          targetKeys={supplierProducts?.map((product) => product._id) || []}
          showSearch
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
          ]}
        />
      </Form.Item>
    </Card>
  );
};
