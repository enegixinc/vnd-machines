import React, { useEffect } from 'react';
import { Flex, Form, FormProps } from 'antd';
import { MultiLangInput } from '@theme-helpers';
import { UploadPicture } from '@components/upload-picture';
import { magexImageToBase64 } from '@helpers';

export const BrandForm: React.FC<{ formProps: FormProps }> = ({
  formProps,
}) => {
  const [base64File, setBase64File] = React.useState<string>('');

  useEffect(() => {
    async function getBase64() {
      if (formProps?.initialValues?.picture) {
        const base64 = await magexImageToBase64(
          formProps?.initialValues?.picture
        );
        setBase64File(base64);
      }
    }

    getBase64();
  }, [formProps?.initialValues?.picture]);

  useEffect(() => {
    formProps?.form?.setFieldsValue({
      picture: base64File,
    });
  }, [base64File]);

  return (
    <Form {...formProps} layout="vertical">
      <Form.Item label="Brand Logo" name="picture">
        <UploadPicture base64File={base64File} setBase64File={setBase64File} />
      </Form.Item>

      <Flex gap={20} wrap="wrap">
        <MultiLangInput />
      </Flex>
    </Form>
  );
};
