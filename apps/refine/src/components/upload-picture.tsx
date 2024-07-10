import {
  type GetProp,
  message,
  Upload,
  UploadFile,
  type UploadProps,
} from 'antd';
import React, { useEffect } from 'react';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
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

  const [header, data] = base64.split(',');
  const contentType = header.split(':')[1].split(';')[0];
  const blob = base64ToBlob(data, contentType);

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

export const UploadPicture = ({
  base64File,
  setBase64File,
}: {
  base64File: string;
  setBase64File: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  useEffect(() => {
    if (base64File) {
      const newFile = base64ToUploadFile(base64File, 'uploaded-picture');
      setFileList([newFile]);
    } else {
      setFileList([]);
    }
  }, [base64File]);

  const onChange: UploadProps['onChange'] = async ({ fileList }) => {
    if (fileList.length > 1) {
      message.error('You can only upload one picture.');
      fileList = [fileList[fileList.length - 1]];
    }
    setFileList(fileList);

    if (fileList.length === 0) {
      setBase64File('');
    } else {
      const base64 = await uploadFileToBase64(fileList[0]);
      setBase64File(base64);
    }
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
    <ImgCrop rotationSlider showReset showGrid>
      <Upload
        listType="picture-card"
        maxCount={1}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </ImgCrop>
  );
};
