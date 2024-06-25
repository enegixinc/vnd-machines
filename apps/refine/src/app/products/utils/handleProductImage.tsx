import { SerializedProductDto } from '@frontend/api-sdk';
import { defaultSrc } from '@app/config';
import React from 'react';
import { handleNullableText } from '@app/products/utils/handleNullableText';

export const handleProductImage = (
  value: SerializedProductDto['productPictures']
) => {
  if (!value) {
    return handleNullableText(null);
  }
  const firstImage = value[0];
  const src = firstImage
    ? `https://devapi.point24h.com/api/thumbs/${firstImage}/tryvnd@point24h.com`
    : defaultSrc;

  return <img src={src} alt="product" width={50} height={50} />;
};
