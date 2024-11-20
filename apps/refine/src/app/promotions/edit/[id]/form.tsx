import React, { useEffect, useState } from 'react';
import { Card, Flex, Form, FormProps, Input, InputNumber, Select } from 'antd';

export const EditPromotionForm: React.FC<{
  formProps: FormProps;
  action: 'create' | 'edit';
}> = ({ formProps, action }) => {
  const [promotionType, setPromotionType] = useState<string>('general');
  const [percentage, setPercentage] = useState<'percentage' | 'fixed'>(
    'percentage'
  );
  const isHappyHour = promotionType === 'happyHour';

  useEffect(() => {
    if (action === 'edit' && formProps?.form) {
      const percentage = formProps.form.getFieldValue('percentage');

      if (percentage) {
        setPercentage('percentage');
      } else {
        setPercentage('fixed');
      }
    }
  }, [action, formProps]);

  return (
    <Form
      {...formProps}
      onFinish={(values) => {
        const isPercentage = percentage === 'percentage';
        values.amount = isPercentage ? values.amount / 100 : values.amount;
        values.percentage = isPercentage;
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
            name="percentage"
            rules={[
              { required: true, message: 'Please select a promotion type' },
            ]}
            style={{ flex: 1 }}
          >
            <Select
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

      {/*<Card title="Promotion Timing" style={{ marginBottom: 16 }}>*/}
      {/*  <Flex gap={20} wrap="wrap">*/}
      {/*    <Form.Item*/}
      {/*      label="Start Date"*/}
      {/*      name="startDate"*/}
      {/*      rules={[{ required: true, message: 'Please select a start date' }]}*/}
      {/*      style={{ flex: 1 }}*/}
      {/*      initialValue={moment()}*/}
      {/*    >*/}
      {/*      <DatePicker*/}
      {/*        style={{ width: '100%' }}*/}
      {/*        showTime*/}
      {/*        format="YYYY-MM-DD HH:mm a"*/}
      {/*      />*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item*/}
      {/*      label="End Date"*/}
      {/*      name="endDate"*/}
      {/*      rules={[{ required: true, message: 'Please select an end date' }]}*/}
      {/*      style={{ flex: 1 }}*/}
      {/*      // initialValue={moment(*/}
      {/*      //   new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)*/}
      {/*      // )} // one week from now*/}
      {/*    >*/}
      {/*      <DatePicker*/}
      {/*        style={{ width: '100%' }}*/}
      {/*        showTime*/}
      {/*        format="YYYY-MM-DD HH:mm a"*/}
      {/*      />*/}
      {/*    </Form.Item>*/}
      {/*  </Flex>*/}

      {/*  <Flex gap={20} wrap="wrap">*/}
      {/*    <Form.Item*/}
      {/*      initialValue={moment('00:00 am', 'HH:mm a')}*/}
      {/*      label="Start Time"*/}
      {/*      name="startTime"*/}
      {/*      style={{ flex: 1 }}*/}
      {/*    >*/}
      {/*      <DatePicker.TimePicker*/}
      {/*        disabled={!isHappyHour}*/}
      {/*        style={{ width: '100%' }}*/}
      {/*        format="HH:mm a"*/}
      {/*      />*/}
      {/*    </Form.Item>*/}

      {/*    <Form.Item*/}
      {/*      initialValue={moment('00:00 am', 'HH:mm a')}*/}
      {/*      label="End Time"*/}
      {/*      name="endTime"*/}
      {/*      style={{ flex: 1 }}*/}
      {/*    >*/}
      {/*      <DatePicker.TimePicker*/}
      {/*        disabled={!isHappyHour}*/}
      {/*        style={{ width: '100%' }}*/}
      {/*        format="HH:mm a"*/}
      {/*      />*/}
      {/*    </Form.Item>*/}
      {/*  </Flex>*/}
      {/*</Card>*/}
    </Form>
  );
};
