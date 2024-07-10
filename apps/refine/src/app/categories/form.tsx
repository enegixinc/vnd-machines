import React, { useEffect } from 'react';
import { Flex, Form, FormProps, Switch } from 'antd';
import { MultiLangInput } from '@theme-helpers';
import { UploadPicture } from '@components/upload-picture';
import { magexImageToBase64 } from '@helpers';

export const CategoryForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
  const [base64File, setBase64File] = React.useState<string>('');
  const [preview, setPreview] = React.useState<string>('');

  useEffect(() => {
    async function getBase64() {
      if (formProps?.initialValues?.categoryPicture) {
        const base64 = await magexImageToBase64(
          formProps?.initialValues?.categoryPicture
        );
        setPreview(base64);
      }
    }

    getBase64();
  }, [formProps?.initialValues?.categoryPicture]);

  useEffect(() => {
    formProps?.form?.setFieldsValue({
      categoryPicture: base64File,
    });
  }, [base64File]);

  return (
    <Form {...formProps} layout="vertical">
      <Form.Item label="Category Picture" name="categoryPicture">
        <UploadPicture preview={preview} setBase64File={setBase64File} />
      </Form.Item>

      <MultiLangInput />

      <Flex gap={20} wrap="wrap">
        <Form.Item label="Sort Index" name="sortIndex" initialValue={true}>
          <Switch />
        </Form.Item>
        <Form.Item label="Auto" name="auto" initialValue={true}>
          <Switch />
        </Form.Item>
      </Flex>
    </Form>
  );
};
