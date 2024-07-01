import { defaultSrc } from '@app/config';
import React from 'react';
import { handleNullableText } from '@app/products/utils/handleNullableText';

export const handleMagextImage = (value: string | undefined) => {
  return (
    <img src={handleMagexImageRaw(value)} alt="image" width={46} height={46} />
  );
};

export const handleMagexImageRaw = (value: string | undefined) =>
  value
    ? `https://devapi.point24h.com/api/thumbs/${value}/tryvnd@point24h.com`
    : defaultSrc;
