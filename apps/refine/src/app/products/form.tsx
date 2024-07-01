import {
  Card,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  UploadFile,
} from 'antd';
import { getValueFromEvent } from '@refinedev/antd';
import { MultiLangInput } from '@theme-helpers';
import React, { useEffect, useState } from 'react';
import {
  handleMagexImageRaw,
  handleMagextImage,
} from '@app/products/utils/handleMagextImage';
import { UploadChangeParam } from 'antd/es/upload';

type FormData = { [key: string]: any };

export const cleanFormData = (data: FormData): FormData => {
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

// const getBase64 = (file: File) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// };

export const ProductForm = ({
  formProps,
  supplierSelectProps,
  brandSelectProps,
  categorySelectProps,
}: {
  formProps: FormProps;
  supplierSelectProps: any;
  brandSelectProps: any;
  categorySelectProps: any;
}) => {
  const transformPictureData = (pictures: string[]) => {
    return pictures.map((pic, index) => ({
      uid: index,
      name: pic,
      status: 'done',
      url: handleMagexImageRaw(pic),
      type: 'image/jpeg',
    }));
  };
  const [fileList, setFileList] = useState([]);
  // const handleUpload = async ({
  //   file,
  // }: UploadChangeParam<UploadFile<any>>) => {
  //
  // };
  //
  // const handleSubmit = async () => {
  //   return await Promise.all(
  //     fileList.map(async (file) => ({
  //       name: file.name,
  //       base64: await getBase64(file.originFileObj),
  //     }))
  //   );
  // };
  //
  useEffect(() => {
    if (formProps.initialValues?.productPictures) {
      setFileList(
        transformPictureData(formProps.initialValues.productPictures)
      );
    }
  }, [formProps.initialValues]);

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={async (data) => {
        // const images = await handleSubmit();
        // data.image1 = images[0];
        formProps.onFinish(cleanFormData(data));
      }}
    >
      <Card title="Basic Information">
        <Form.Item
          // name="productPictures"
          label="Product Pictures"
        >
          <Form.Item
            // valuePropName="fileList"
            // getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              listType="picture"
              defaultFileList={fileList}
              fileList={fileList}
              // onChange={handleUpload}
            >
              <p className="ant-upload-text">
                Drag & drop files here or click to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <MultiLangInput />

        <Flex gap={20} wrap="wrap">
          <Form.Item
            style={{
              flex: 1,
            }}
            label="UPC"
            name="upc"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              flex: 1,
            }}
            label="Barcode"
            name="barcode"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Flex>

        <MultiLangInput textArea name="description" />
      </Card>

      <Card title="Associations" style={{ marginTop: 16 }}>
        <Flex gap={20} wrap="wrap">
          <Form.Item
            style={{ flex: 1 }}
            label="Supplier"
            name={['supplier', '_id']}
          >
            <Select {...supplierSelectProps} />
          </Form.Item>
          <Form.Item style={{ flex: 1 }} label="Brand" name={['brand', '_id']}>
            <Select {...brandSelectProps} />
          </Form.Item>
        </Flex>
        <Form.Item label="Category" name={['category', '_id']}>
          <Select {...categorySelectProps} />
        </Form.Item>
      </Card>

      <Flex
        gap={20}
        style={{
          marginTop: 16,
        }}
        wrap="wrap"
        justify={'space-between'}
      >
        <Card title="Pricing" style={{ flex: 1 }}>
          <Flex gap={20} wrap="wrap">
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true }]}
              initialValue={0}
            >
              <InputNumber
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <Form.Item
              label="Cost Price"
              name="costPrice"
              initialValue={0}
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <Form.Item
              label="Additional Price"
              name="additionPrice"
              initialValue={0}
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Flex>
          <Form.Item
            label="Price Per Kilo"
            name="pricePerKilo"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Card>
        <Card title="Dimensions" style={{ flex: 1 }}>
          <Flex gap={20} wrap="wrap">
            <Form.Item label="Height" name={['dimension', 'height']}>
              <InputNumber
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <Form.Item label="Length" name={['dimension', 'length']}>
              <InputNumber
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <Form.Item label="Width" name={['dimension', 'width']}>
              <InputNumber
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Flex>
        </Card>
        <Card
          title="Additional Information"
          style={{ flexBasis: 'calc(50% - 10px)' }}
        >
          <Form.Item label="Product Video" name="productVideo">
            <Upload.Dragger
              listType="picture"
              multiple
              beforeUpload={() => false}
            >
              <p className="ant-upload-text">
                Drag & drop files here or click to upload
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item label="Product Type" name="prodType">
            <Input />
          </Form.Item>
          <Form.Item
            label="Age Control"
            name="ageControl"
            rules={[{ required: true }]}
            initialValue={0}
          >
            <InputNumber />
          </Form.Item>

          <Flex gap={20} wrap="wrap">
            <Form.Item label="Sort Index" name="sortIndex" initialValue={1}>
              <Switch />
            </Form.Item>
            <Form.Item label="VAT Index" name="vatIndex" initialValue={1}>
              <Switch />
            </Form.Item>

            <Form.Item
              label="Virtual Product"
              name="virtualProduct"
              initialValue={0}
            >
              <Switch />
            </Form.Item>
          </Flex>
        </Card>
      </Flex>

      <Card title="Extra Information" style={{ marginTop: 16 }}>
        <MultiLangInput optional textArea name="detail" />
        <MultiLangInput optional textArea name="include" />
        <MultiLangInput optional textArea name="ingredients" />
        <MultiLangInput optional textArea name="keyFeatures" />
        <MultiLangInput optional textArea name="specification" />
      </Card>
    </Form>
  );
};
