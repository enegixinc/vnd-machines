'use client';

import { Edit, getValueFromEvent, useForm } from '@refinedev/antd';
import { Flex, Form, Upload } from 'antd';
import React from 'react';
import { MultiLangInput } from '@theme-helpers';

export default function BrandEdit() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Brand Picture">
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
        <Flex gap={20} wrap="wrap">
          <MultiLangInput />
        </Flex>
      </Form>
    </Edit>
  );
}
