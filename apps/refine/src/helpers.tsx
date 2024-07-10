import { Typography } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { RcFile } from 'antd/es/upload';
import { handleMagexImageRaw } from '@app/products/utils/handleMagextImage';

dayjs.extend(utc);

export function isEmptyObject(obj: any) {
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== 0) {
      return false;
    }
  }
  return true;
}

export function safeArrayCounter(data: any) {
  if (Array.isArray(data)) {
    let count = 0;
    for (const item of data) {
      if (typeof item === 'object' && item !== null && !isEmptyObject(item)) {
        count++;
      }
    }
    return count;
  } else if (typeof data === 'object' && data !== null) {
    let count = 0;
    for (const key in data) {
      if (Array.isArray(data[key])) {
        for (const item of data[key]) {
          if (
            typeof item === 'object' &&
            item !== null &&
            !isEmptyObject(item)
          ) {
            count++;
          }
        }
      }
    }
    return count;
  }
  return 0;
}

export const handleEmptyString = (value: string | null | undefined) => {
  if (value === null || value === undefined || value === '' || value === ' ') {
    return (
      <Typography.Text
        type="secondary"
        style={{
          fontStyle: 'italic',
        }}
      >
        N/A
      </Typography.Text>
    );
  }
  return value;
};

export const formatPrice = (price: number | string) => {
  if (typeof price === 'string') {
    price = parseFloat(price);
  }

  if (isNaN(price)) {
    return 'N/A';
  }

  if (!price) {
    return '0.000 KD';
  }

  return price.toFixed(3) + ' KD';
};

export const formatTime = (time: string) =>
  dayjs(time).utcOffset(0).format('MM/DD/YYYY HH:mm:ss');

export const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const magexImageToBase64 = async (url: string): Promise<string> =>
  await fetch(handleMagexImageRaw(url))
    .then((res) => res.blob())
    .then((blob) => getBase64(blob as RcFile));

export const formatFileSize = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];

  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};
