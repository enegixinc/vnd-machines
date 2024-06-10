'use client';

import dataProviderNestjsxCrud from '@refinedev/nestjsx-crud';
import { axiosInstance } from '@providers/api';

const API_URL = 'https://staging-vnd-api.5ostudios.com';

export const dataProvider = dataProviderNestjsxCrud(API_URL, axiosInstance);
