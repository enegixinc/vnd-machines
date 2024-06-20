'use client';

import dataProviderNestjsxCrud from '@refinedev/nestjsx-crud';
import { axiosInstance } from '@providers/api';

// const API_URL = 'https://staging-vnd-api.5ostudios.com';
const API_URL = 'http://localhost:3000';

export const dataProvider = dataProviderNestjsxCrud(API_URL, axiosInstance);
