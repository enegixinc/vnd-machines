import { Typography } from 'antd';
import Router from 'next/router';

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
