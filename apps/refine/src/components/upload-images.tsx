import { type GetProp, UploadFile, type UploadProps } from 'antd';
import React, { useEffect } from 'react';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import ShortUniqueId from 'short-unique-id';

async function uploadFileToBase64(uploadFile: UploadFile): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert file to base64.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Error occurred while reading file.'));
    };
    reader.readAsDataURL(uploadFile.originFileObj as Blob);
  });
}

function base64ToUploadFile(base64: string, filename: string): UploadFile {
  // Function to convert base64 to Blob
  const base64ToBlob = (
    base64String: string,
    contentType: string = '',
    sliceSize: number = 512
  ) => {
    const byteCharacters = atob(base64String);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  // Split the base64 string to get content type and data
  const [header, data] = base64.split(',');
  const contentType = header.split(':')[1].split(';')[0];
  const blob = base64ToBlob(data, contentType);

  // Convert Blob to File
  const file = new File([blob], filename, { type: contentType });

  return {
    uid: new ShortUniqueId({ length: 10 }).rnd(),
    name: filename,
    status: 'done',
    url: URL.createObjectURL(file),
    originFileObj: file as RcFile,
  };
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const ImageUpload = ({
  base64FileList,
  setBase64FileList,
}: {
  base64FileList: string[];
  setBase64FileList: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  useEffect(() => {
    const newFileList = base64FileList.map((base64, index) =>
      base64ToUploadFile(base64, `image-${index + 1}`)
    );
    setFileList(newFileList);
  }, [base64FileList]);

  const onChange: UploadProps['onChange'] = async ({ fileList }) => {
    setFileList(fileList);
    const base64Files = await Promise.all(
      fileList.map(async (file) => {
        if (file.originFileObj) {
          return uploadFileToBase64(file);
        }
        return '';
      })
    );

    setBase64FileList(base64Files);

    console.log({ base64Files });
    console.log({ fileList });
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Dragger
      listType="picture"
      maxCount={4}
      fileList={fileList}
      onChange={onChange}
      onPreview={onPreview}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};
