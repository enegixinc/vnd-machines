import React from 'react';
import {
  Card,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Switch,
  UploadProps,
} from 'antd';
import { getValueFromEvent } from '@refinedev/antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { cleanFormData } from '@app/products/form';
import { axiosInstance, vndClient } from '@providers/api';
import axios from 'axios';

export const ContractForm = ({
  formProps,
  supplierSelectProps,
}: {
  formProps: FormProps;
  supplierSelectProps: any;
}) => {
  const props: UploadProps = {
    name: 'files',
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append('files', file);

      await axios
        .post('http://localhost:3000/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          message.success('File uploaded successfully');
          const files = res.data.map((file: any) => ({
            uid: file.id,
            name: file.originalName,
            url: file.url,
            size: file.size,
          }));
          formProps.form?.setFieldsValue({ files });
          console.log('Files', files);
        })
        .catch((err) => {
          message.error('File upload failed');
        });
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={(data) => {
        formProps.onFinish(cleanFormData(data));
      }}
    >
      <Card title="Basic Information">
        <Form.Item
          label="Select Supplier"
          name={['supplier', '_id']}
          rules={[{ required: true, message: 'Please select the supplier' }]}
        >
          <Select {...supplierSelectProps} />
        </Form.Item>

        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          styles={{
            item: {
              flex: 1,
            },
          }}
        >
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please enter the start date' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please enter the end date' }]}
          >
            <Input type="date" />
          </Form.Item>
        </Space>
      </Card>

      <Card title="Financial Information" style={{ marginTop: 16 }}>
        <Form.Item
          label="Fee Per Sale"
          name="feePerSale"
          rules={[{ required: true, message: 'Please enter the fee per sale' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Fee Type"
          name="feeType"
          rules={[{ required: true, message: 'Please select the fee type' }]}
        >
          <Select>
            <Select.Option value="fixed">Fixed</Select.Option>
            <Select.Option value="percentage">Percentage</Select.Option>
          </Select>
        </Form.Item>
      </Card>

      {/* Add more sections as needed for other fields */}

      <Card title="Additional Information" style={{ marginTop: 16 }}>
        <Form.Item label="Documents" name="files">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: false, message: 'Please enter the description' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Card>
    </Form>
  );
};
