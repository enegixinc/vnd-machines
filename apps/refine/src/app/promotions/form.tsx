import React, { useState } from 'react';
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
import { AutoSelectProducts } from '@components/auto-select-products';

export const PromotionForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
  const [promotionType, setPromotionType] = useState<string>('general');
  const [cateOrProd, setCateOrProd] = useState<string>('');
  const isHappyHour = promotionType === 'happyHour';
  const [associationDisabled, setAssociationDisabled] = useState({
    products: false,
    categories: false,
  });

  const handleAssociationDisabled = () => {
    const cateOrProd = formProps?.form?.getFieldValue('cateOrProd');

    switch (cateOrProd) {
      case 'All Products':
        setAssociationDisabled({
          products: false,
          categories: true,
        });
        setCateOrProd('prod');
        break;
      case 'prod':
        setAssociationDisabled({
          products: false,
          categories: true,
        });
        setCateOrProd('prod');
        break;
      case 'cate':
        setAssociationDisabled({
          products: true,
          categories: false,
        });
        setCateOrProd('cate');
        break;
      default:
        setAssociationDisabled({
          products: false,
          categories: false,
        });
        setCateOrProd('');
    }
  };

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={(values) => {
        const isAllProducts = values.product.some(
          (product: { value: string }) => product.value === 'All Products'
        );

        const payload = Object.assign({}, values, {
          startDate: values.startDate.toISOString(),
          endDate: values.endDate.toISOString(),
          startTime: values.startTime.toISOString(),
          endTime: values.endTime.toISOString(),
          machine: values.machine.value,
          product: isAllProducts ? 'All Products' : values.product,
          referTo: 'tryvnd@point24h.com',
          productsToBuy: 0,
          cateOrProd,
        });
        formProps?.onFinish(payload);
      }}
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
            placeholder="Select promotion type"
            onChange={(value) => {
              setPromotionType(value);
            }}
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
            initialValue={'percentage'}
            rules={[
              { required: true, message: 'Please select a promotion type' },
            ]}
            style={{ flex: 1 }}
          >
            <Select
              placeholder="Select promotion type"
              onChange={(value) => {
                formProps?.form?.setFieldsValue({
                  percentage: value === 'percentage',
                });
              }}
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
            name="numberOfProducts"
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
            name="startDate"
            rules={[{ required: true, message: 'Please select a start date' }]}
            style={{ flex: 1 }}
            initialValue={moment()}
          >
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm a"
            />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please select an end date' }]}
            style={{ flex: 1 }}
            // initialValue={moment(
            //   new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            // )} // one week from now
          >
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm a"
            />
          </Form.Item>
        </Flex>

        <Flex gap={20} wrap="wrap">
          <Form.Item
            initialValue={moment('00:00 am', 'HH:mm a')}
            label="Start Time"
            name="startTime"
            style={{ flex: 1 }}
          >
            <DatePicker.TimePicker
              disabled={!isHappyHour}
              style={{ width: '100%' }}
              format="HH:mm a"
            />
          </Form.Item>

          <Form.Item
            initialValue={moment('00:00 am', 'HH:mm a')}
            label="End Time"
            name="endTime"
            style={{ flex: 1 }}
          >
            <DatePicker.TimePicker
              disabled={!isHappyHour}
              style={{ width: '100%' }}
              format="HH:mm a"
            />
          </Form.Item>
        </Flex>
      </Card>

      <Card title="Associations" style={{ marginBottom: 16 }}>
        <Flex gap={20} wrap="wrap">
          <Form.Item
            label="Products"
            name="product"
            style={{ flex: 1 }}
            rules={[
              {
                required: !associationDisabled.products,
                message: 'Please select products',
              },
            ]}
          >
            <AutoSelectProducts
              entity="products"
              mode="multiple"
              disabled={associationDisabled.products}
              onChange={(value: { value: string }[]) => {
                // if all products are selected
                if (value.some((v) => v.value === 'All Products')) {
                  formProps?.form?.setFieldsValue({
                    cateOrProd: 'All Products',
                    product: [],
                  });
                } else if (value.length) {
                  formProps?.form?.setFieldsValue({
                    cateOrProd: 'prod',
                    product: value.map((v) => v.value),
                  });
                } else {
                  formProps?.form?.setFieldsValue({
                    cateOrProd: '',
                    product: [],
                  });
                }

                handleAssociationDisabled();
              }}
            />
          </Form.Item>
          <Form.Item
            label="Categories"
            name="categories"
            style={{ flex: 1 }}
            rules={[
              {
                required: !associationDisabled.categories,
                message: 'Please select categories',
              },
            ]}
          >
            <AutoSelectProducts
              disabled={associationDisabled.categories}
              onChange={(values: { value: string }[]) => {
                if (values.length) {
                  formProps?.form?.setFieldsValue({
                    cateOrProd: 'cate',
                    product: values.map((v) => v.value),
                  });
                } else {
                  formProps?.form?.setFieldsValue({
                    cateOrProd: '',
                    product: [],
                  });
                }

                handleAssociationDisabled();
              }}
              entity="categories"
              mode="multiple"
            />
          </Form.Item>
          <Form.Item
            label="Machine"
            name="machine"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please select a machine' }]}
          >
            <AutoSelectProducts entity="machines" />
          </Form.Item>
        </Flex>
      </Card>
    </Form>
  );
};
