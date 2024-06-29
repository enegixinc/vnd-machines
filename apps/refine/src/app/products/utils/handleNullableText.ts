import { handleEmptyString } from '@helpers';

export const handleNullableText = (text: string | null) => {
  return text || '-';
};

export const handleNullableFullName = (record: any) => {
  return handleEmptyString(record && record.fullName);
};
