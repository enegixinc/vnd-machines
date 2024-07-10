import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { cleanFormData } from '@app/products/form';
import { ContractStatus } from '@core';
import { axiosInstance } from '@providers/api';
import { envSchema } from '@providers/env';

const { Dragger } = Upload;

function convertToFileUpload(fileEntity: any): UploadFile {
  return {
    uid: fileEntity._id.toString(), // Assuming id exists in DatabaseEntity
    name: fileEntity.originalname,
    status: 'done', // Assuming the file is already uploaded and done
    url: fileEntity.url,
    size: fileEntity.size,
  };
}

export const ContractForm = ({
  formProps,
  supplierSelectProps,
}: {
  formProps: FormProps;
  supplierSelectProps: any;
}) => {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    if (formProps.initialValues?.files) {
      setFiles(formProps.initialValues.files);
    }
  }, [formProps.initialValues]);

  const uploadProps: UploadProps = {
    name: 'rawFiles',
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append('files', file);

      try {
        const res = await axiosInstance.post(
          `${envSchema.NEXT_PUBLIC_API_URL}/files/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        message.success('File uploaded successfully');
        setFiles((prevFiles) => [...prevFiles, res.data.files[0]]);
        onSuccess && onSuccess('ok');
      } catch (err) {
        message.error('File upload failed');
        onError && onError(err);
      }
    },
    onDrop(e) {
      const fileId = e.dataTransfer.files[0].name;
      console.log('Dropped file', fileId);
    },
  };

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={(data) => {
        data.files = files;
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
            initialValue={new Date().toISOString().split('T')[0]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please enter the end date' }]}
            initialValue={
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0]
            }
          >
            <Input type="date" />
          </Form.Item>
        </Space>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select the status' }]}
          initialValue={
            formProps.initialValues?.status || ContractStatus.ACTIVE
          }
        >
          <Select
            options={[
              { value: ContractStatus.ACTIVE, label: 'Active' },
              { value: ContractStatus.EXPIRED, label: 'Expired' },
              { value: ContractStatus.TERMINATED, label: 'Terminated' },
            ]}
          />
        </Form.Item>
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

      <Card title="Additional Information" style={{ marginTop: 16 }}>
        <Form.Item label="Documents">
          <Dragger {...uploadProps} fileList={files.map(convertToFileUpload)}>
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
