'use client';

import { Create, getValueFromEvent, useForm } from '@refinedev/antd';
import { Flex, Form, Switch, Upload } from 'antd';
import React from 'react';
import { MultiLangInput } from '@theme-helpers';

export default function CategoryCreate() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Category Picture">
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Upload.Dragger
              listType="picture"
              multiple
              beforeUpload={() => false}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <MultiLangInput />
        <Flex gap={20} wrap="wrap">
          <Form.Item label="Sort Index" name="sortIndex" initialValue={true}>
            <Switch />
          </Form.Item>
          <Form.Item label="Auto" name="auto" initialValue={true}>
            <Switch />
          </Form.Item>
        </Flex>
      </Form>
    </Create>
  );
}
