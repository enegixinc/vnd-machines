'use client';

import dataProviderNestjsxCrud from '../../crud-provider';
import { axiosInstance } from '@providers/api';
import { envSchema } from '@providers/env';

export const dataProvider = dataProviderNestjsxCrud(
  envSchema.NEXT_PUBLIC_API_URL,
  axiosInstance
);
