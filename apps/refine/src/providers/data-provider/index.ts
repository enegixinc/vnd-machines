'use client';

import dataProviderNestjsxCrud from '@refinedev/nestjsx-crud';

const API_URL = 'https://staging-vnd-api.5ostudios.com';

export const dataProvider = dataProviderNestjsxCrud(API_URL);
