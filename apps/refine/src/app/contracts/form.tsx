import React from 'react';
import { Card, Form, Input, InputNumber, Select, Space, Switch } from 'antd';
import { getValueFromEvent } from '@refinedev/antd';

type FormData = { [key: string]: any };

const cleanFormData = (data: FormData): FormData => {
  const cleanedData: FormData = {};

  for (const key in data) {
    if (
      data[key] !== undefined &&
      data[key] !== null &&
      data[key] !== '' &&
      (typeof data[key] !== 'object' ||
        (Object.keys(data[key]).length > 0 && cleanNestedObject(data[key])))
    ) {
      cleanedData[key] = data[key];
    }
  }

  return cleanedData;
};

const cleanNestedObject = (obj: FormData): boolean => {
  const cleanedNestedObj: FormData = {};

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      cleanedNestedObj[key] = obj[key];
    }
  }

  return Object.keys(cleanedNestedObj).length > 0;
};

export const ContractForm = ({
  formProps,
  supplierSelectProps,
}: {
  formProps: any;
  supplierSelectProps: any;
}) => {
  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={(data) => {
        formProps.onFinish(cleanFormData(data));
      }}
    >
      <Card title="Basic Information">
        <Space>
          <Form.Item
            label="Start Date"
            name="startDate"
            style={{
              flex: 1,
            }}
            rules={[{ required: true, message: 'Please enter the start date' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            style={{
              flex: 1,
            }}
            rules={[{ required: true, message: 'Please enter the end date' }]}
          >
            <Input type="date" />
          </Form.Item>
        </Space>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: false, message: 'Please enter the description' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {/*<Form.Item*/}
        {/*  label="Status"*/}
        {/*  name="status"*/}
        {/*  initialValue="active"*/}
        {/*  rules={[{ required: true, message: 'Please select the status' }]}*/}
        {/*>*/}
        {/*  <Select>*/}
        {/*    <Select.Option value="active">Active</Select.Option>*/}
        {/*    <Select.Option value="INACTIVE">Inactive</Select.Option>*/}
        {/*  </Select>*/}
        {/*</Form.Item>*/}
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
            {/* Assuming FeeType options are predefined */}
            <Select.Option value="fixed">Fixed</Select.Option>
            <Select.Option value="percentage">Percentage</Select.Option>
          </Select>
        </Form.Item>
      </Card>

      <Card title="Supplier" style={{ marginTop: 16 }}>
        <Form.Item
          label="Select Supplier"
          name={['supplier', '_id']}
          rules={[{ required: true, message: 'Please select the supplier' }]}
        >
          <Select {...supplierSelectProps} />
        </Form.Item>
      </Card>

      {/* Add more sections as needed for other fields */}

      <Card title="Additional Information" style={{ marginTop: 16 }}>
        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Card>
    </Form>
  );
};
