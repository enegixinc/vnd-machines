'use client';
import { Form, Input } from 'antd';
import React from 'react';

export const MultiLangInput = () => {
  return (
    <>
      <Form.Item
        style={{
          flex: 1,
        }}
        label="Name (English)"
        name={['name', 'en']}
        rules={[
          {
            required: true,
            message: 'Please enter the English name',
          },
        ]}
      >
        <Input placeholder="Name in English" />
      </Form.Item>
      <Form.Item
        style={{
          flex: 1,
        }}
        label="Name (Arabic)"
        name={['name', 'ar']}
        rules={[
          {
            required: true,
            message: 'Please enter the Arabic name',
          },
        ]}
      >
        <Input placeholder="Name in Arabic" />
      </Form.Item>
    </>
  );
};
