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
} from 'antd';
import { useSelect } from '@refinedev/antd';
import { MultiLangInput } from '@theme-helpers';
import React, { useEffect, useState } from 'react';
import { handleMagexImageRaw } from '@app/products/utils/handleMagextImage';
import { RcFile } from 'antd/es/upload';
import { ImageUpload } from '@components/upload-images';

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

// Helper function to convert file to base64
const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// // Function to take UploadFile and convert it to base64
// const convertUploadFileToBase64 = async (
//   uploadFile: UploadFile
// ): Promise<string | null> => {
//   if (uploadFile.originFileObj) {
//     try {
//       return await getBase64(uploadFile.originFileObj);
//     } catch (error) {
//       console.error('Error converting file to base64:', error);
//       return null;
//     }
//   }
//   return null;
// };
//
// const magexImageUrlToBase64 = async (url: string) => {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   return await new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => {
//       resolve(reader.result as string);
//     };
//     reader.onerror = (error) => reject(error);
//   });
// };

const transformPictureData = (pictures: string[]) => {
  return pictures.map((pic, index) => ({
    uid: index.toString(),
    name: pic,
    status: 'done',
    url: handleMagexImageRaw(pic),
    type: 'image/jpeg',
  }));
};

export const ProductForm = ({
  formProps,
  isSupplier,
}: {
  formProps: FormProps;
  isSupplier: boolean;
}) => {
  const [imagesBase64, setBase64FileList] = useState<string[]>([]);

  const { selectProps: brandSelectProps } = useSelect({
    resource: 'brands',
    optionLabel: 'fullName',
    optionValue: '_id',
  });
  const { selectProps: supplierSelectProps } = useSelect({
    resource: 'users',
    optionLabel: 'fullName',
    filters: [{ field: 'role', operator: 'eq', value: 'supplier' }],
    optionValue: '_id',
  });
  const { selectProps: categorySelectProps } = useSelect({
    resource: 'categories',
    optionLabel: 'fullName',
    optionValue: '_id',
  });

  useEffect(() => {
    if (formProps.initialValues?.productPictures) {
      const convertPicturesToBase64 = async () => {
        const base64Pictures = await Promise.all(
          formProps.initialValues.productPictures.map((picture: string) =>
            fetch(handleMagexImageRaw(picture))
              .then((res) => res.blob())
              .then((blob) => getBase64(blob as RcFile))
          )
        );
        setBase64FileList(base64Pictures);
      };

      convertPicturesToBase64();
    }
  }, [formProps?.initialValues]);

  useEffect(() => {
    formProps?.form?.setFieldsValue({ imagesBase64 });
    console.log('imagesBase64', imagesBase64);
  }, [imagesBase64]);

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={async (data) => {
        console.log('data', data);
        formProps.onFinish(cleanFormData(data));
      }}
    >
      <Card title="Basic Information">
        <Form.Item
          name="imagesBase64"
          label="Product Pictures"
          initialValue={imagesBase64}
        >
          <ImageUpload
            base64FileList={imagesBase64}
            setBase64FileList={setBase64FileList}
          />
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
            rules={[{ required: false }]}
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
            <Select disabled={isSupplier} {...supplierSelectProps} />
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
