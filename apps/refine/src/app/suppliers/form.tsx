'use client';

import React, { useState } from 'react';
import { Card, Divider, Form, Input, Select, Switch, Transfer } from 'antd';
import { UserRole } from '@core';

const SupplierForm = ({
  formProps,
  products,
}: {
  formProps: any;
  products: any[];
}) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const handleTransferChaAnge = (nextTargetKeys: string[]) => {
    console.log(nextTargetKeys);
    setTargetKeys(nextTargetKeys);
  };
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
      <Card title={'Associations'}>
        <Form.Item label="Products" name="products">
          <Transfer
            dataSource={products}
            showSearch
            targetKeys={targetKeys}
            onChange={handleTransferChaAnge}
            render={(item) => item.name.en}
            rowKey={(item) => item._id}
            pagination={true}
          />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default SupplierForm;
