'use client';

import React from 'react';
import { Card, Form, FormProps, Input, Switch } from 'antd';

const AdminForm = ({
  formProps,
  action,
}: {
  formProps: FormProps;
  action: 'create' | 'edit';
}) => {
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
        {action === 'create' && (
          <>
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
              rules={[{ message: 'Please enter phone number' }]}
            >
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { message: 'Please enter password', required: action === 'create' },
          ]}
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
    </Form>
  );
};

export default AdminForm;
