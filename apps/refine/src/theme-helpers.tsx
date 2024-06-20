'use client';
import { Flex, Form, Input } from 'antd';
import React from 'react';

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const MultiLangInput = ({
  name,
  textArea,
  optional,
}: {
  name?: string;
  textArea?: boolean;
  optional?: boolean;
}) => {
  const fieldName = capitalize(name ?? 'name');
  return (
    <Flex gap={20} wrap="wrap">
      <Form.Item
        style={{
          flex: 1,
        }}
        label={`${fieldName} (English)`}
        name={[name ?? 'name', 'en']}
        rules={[
          {
            required: !optional,
            message: 'Please enter the English value',
          },
        ]}
      >
        {textArea ? (
          <Input.TextArea placeholder={`${fieldName} in English`} />
        ) : (
          <Input placeholder={`${fieldName} in English`} />
        )}
      </Form.Item>
      <Form.Item
        style={{
          flex: 1,
        }}
        label={`${fieldName} (Arabic)`}
        name={[name ?? 'name', 'ar']}
        rules={[
          {
            required: !optional,
            message: 'Please enter the Arabic value',
          },
        ]}
      >
        {textArea ? (
          <Input.TextArea placeholder={`${fieldName} in Arabic`} />
        ) : (
          <Input placeholder={`${fieldName} in Arabic`} />
        )}
      </Form.Item>
    </Flex>
  );
};
