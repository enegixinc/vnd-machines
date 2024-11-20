import React, { useEffect, useState } from 'react';
import {
  Card,
  DatePicker,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
} from 'antd';
import moment from 'moment';

export const EditPromotionForm: React.FC<{
  formProps: FormProps;
  action: 'create' | 'edit';
}> = ({ formProps, action }) => {
  const [promotionType, setPromotionType] = useState<string>('general');
  const [percentage, setPercentage] = useState<'percentage' | 'fixed'>(
    'percentage'
  );
  const isHappyHour = promotionType === 'happyHour';

  const [dates, setDates] = useState({
    startDate: moment(),
    endDate: moment(),
    startTime: moment(),
    endTime: moment(),
  });

  useEffect(() => {
    if (action === 'edit' && formProps?.form) {
      const percentage = formProps.form.getFieldValue('percentage');

      if (percentage) {
        setPercentage('percentage');
        formProps.form.setFieldsValue({
          amount: formProps.form.getFieldValue('amount') * 100,
        });
      } else {
        setPercentage('fixed');
      }

      // Ensure date values are compatible
      const startDate = formProps.form.getFieldValue('startDate');
      const endDate = formProps.form.getFieldValue('endDate');
      const startTime = formProps.form.getFieldValue('startTime');
      const endTime = formProps.form.getFieldValue('endTime');

      setDates({
        startDate: moment(startDate).subtract(2, 'hours'),
        endDate: moment(endDate).subtract(2, 'hours'),
        startTime: moment(startTime).subtract(2, 'hours'),
        endTime: moment(endTime).subtract(2, 'hours'),
      });
    }
  }, [action, formProps]);

  return (
    <Form
      {...formProps}
      onFinish={(values) => {
        const isPercentage = percentage === 'percentage';
        values.amount = isPercentage ? values.amount / 100 : values.amount;
        values.percentage = isPercentage;

        // Convert date values back to ISO string for submission
        // decrement 2 hours to account for timezone offset
        values.startDate = dates.startDate.subtract(-2, 'hours').toISOString();
        values.endDate = dates.endDate.subtract(-2, 'hours').toISOString();
        values.startTime = dates.startTime.subtract(-2, 'hours').toISOString();
        values.endTime = dates.endTime.subtract(-2, 'hours').toISOString();
        formProps.onFinish?.(values);
      }}
      layout="vertical"
    >
      <Card title="Promotion Details" style={{ marginBottom: 16 }}>
        <Form.Item
          label="Promotion Type"
          initialValue={promotionType}
          name="promoType"
          rules={[
            { required: true, message: 'Please select a promotion type' },
          ]}
          style={{ flex: 1 }}
        >
          <Select
            disabled={action === 'edit'}
            placeholder="Select promotion type"
          >
            <Select.Option value="general">General</Select.Option>
            <Select.Option value="generalWithCode">
              General With Code
            </Select.Option>
            <Select.Option value="oneTimeCode">One Time Code</Select.Option>
            <Select.Option value="buyXProducts">Buy X Products</Select.Option>
            <Select.Option value="happyHour">Happy Hour</Select.Option>
          </Select>
        </Form.Item>

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

        <Flex gap={20} wrap="wrap">
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
          <Form.Item
            label="Value Type"
            rules={[
              { required: true, message: 'Please select a promotion type' },
            ]}
            style={{ flex: 1 }}
          >
            <Select
              value={percentage}
              onChange={(value) => setPercentage(value)}
              placeholder="Select promotion type"
            >
              <Select.Option value="percentage">Percentage</Select.Option>
              <Select.Option value="fixed">Fixed</Select.Option>
            </Select>
          </Form.Item>
        </Flex>

        <Flex gap={20} wrap="wrap">
          <Form.Item label="Code" name="code" style={{ flex: 1 }}>
            <Input
              placeholder="Enter code"
              disabled={promotionType !== 'generalWithCode'}
            />
          </Form.Item>
          <Form.Item
            label="Number of Products"
            name="productsToBuy"
            style={{ flex: 1 }}
          >
            <InputNumber
              min={0}
              placeholder="Enter number of products"
              disabled={promotionType !== 'buyXProducts'}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Flex>
      </Card>

      <Card title="Promotion Timing" style={{ marginBottom: 16 }}>
        <Flex gap={20} wrap="wrap">
          <Form.Item
            label="Start Date"
            rules={[{ required: true, message: 'Please select a start date' }]}
            style={{ flex: 1 }}
          >
            <DatePicker
              onChange={(date) => setDates({ ...dates, startDate: date })}
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm a"
            />
          </Form.Item>

          <Form.Item
            label="End Date"
            rules={[{ required: true, message: 'Please select an end date' }]}
            style={{ flex: 1 }}
          >
            <DatePicker
              onChange={(date) => setDates({ ...dates, endDate: date })}
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm a"
            />
          </Form.Item>
        </Flex>

        <Flex gap={20} wrap="wrap">
          <Form.Item label="Start Time" style={{ flex: 1 }}>
            <DatePicker.TimePicker
              value={dates.startTime}
              disabled={!isHappyHour}
              style={{ width: '100%' }}
              format="HH:mm a"
            />
          </Form.Item>

          <Form.Item label="End Time" style={{ flex: 1 }}>
            <DatePicker.TimePicker
              value={dates.endTime}
              disabled={!isHappyHour}
              style={{ width: '100%' }}
              format="HH:mm a"
            />
          </Form.Item>
        </Flex>
      </Card>
    </Form>
  );
};
