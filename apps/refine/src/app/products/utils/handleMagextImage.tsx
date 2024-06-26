import { defaultSrc } from '@app/config';
import React from 'react';
import { handleNullableText } from '@app/products/utils/handleNullableText';

export const handleMagextImage = (value: string | undefined) => {
  const src = value
    ? `https://devapi.point24h.com/api/thumbs/${value}/tryvnd@point24h.com`
    : defaultSrc;

  return <img src={src} alt="image" width={50} height={50} />;
};
