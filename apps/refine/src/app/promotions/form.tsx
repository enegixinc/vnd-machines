import React from 'react';
import {
  Card,
  DatePicker,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  Switch,
  TimePicker,
} from 'antd';

export const PromotionForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
  return (
    <Form {...formProps} layout="vertical">
      <Card title="Promotion Details" style={{ marginBottom: 16 }}>
        <Flex gap={20} wrap="wrap">
          <Form.Item
            label="Promotion Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter a promotion title' },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            label="Promotion Code"
            name="code"
            rules={[
              { required: true, message: 'Please enter a promotion code' },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter unique code" />
          </Form.Item>

          <Form.Item label="Department" name="department" style={{ flex: 1 }}>
            <Input placeholder="Enter department name" />
          </Form.Item>

          <Form.Item
            label="Promotion Type"
            name="promoType"
            rules={[
              { required: true, message: 'Please select a promotion type' },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Type of promotion" />
          </Form.Item>

          <Form.Item
            label="Discount Amount"
            name="amount"
            rules={[
              { required: true, message: 'Please enter a discount amount' },
            ]}
            style={{ flex: 1 }}
          >
            <InputNumber min={0} placeholder="0.00" style={{ width: '100%' }} />
          </Form.Item>
        </Flex>
      </Card>

      <Card title="Promotion Timing" style={{ marginBottom: 16 }}>
        <Flex gap={20} wrap="wrap">
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select a start date' }]}
            style={{ flex: 1 }}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please select an end date' }]}
            style={{ flex: 1 }}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Start Time" name="startTime" style={{ flex: 1 }}>
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="End Time" name="endTime" style={{ flex: 1 }}>
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
        </Flex>
      </Card>

      <Card title="Additional Settings" style={{ marginBottom: 16 }}>
        <Flex gap={20} wrap="wrap">
          <Form.Item
            label="Products to Buy"
            name="productsToBuy"
            style={{ flex: 1 }}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Active" name="active" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            label="Percentage Discount"
            name="percentage"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Single Use Only"
            name="isOne"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Flex>
      </Card>

      <Card title="Code Details">
        <Form.Item label="Email Codes" name="emailCode">
          <Input.TextArea placeholder="Enter email codes, separated by commas" />
        </Form.Item>

        <Form.Item label="One-Time Codes" name="oneTimeCode">
          <Input.TextArea placeholder="Enter one-time codes, separated by commas" />
        </Form.Item>

        <Form.Item label="Origin Codes" name="originCode">
          <Input.TextArea placeholder="Enter origin codes, separated by commas" />
        </Form.Item>

        <Form.Item label="Reference" name="referTo">
          <Input placeholder="Reference to a specific entity" />
        </Form.Item>
      </Card>
    </Form>
  );
};
