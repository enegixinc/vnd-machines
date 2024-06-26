import NestjsDataProvider from '@refinedev/nestjsx-crud';

// export const API_BASE_URL = 'https://api.crm.refine.dev';
// export const API_URL = `${API_BASE_URL}/graphql`;
// export const WS_URL = 'wss://api.crm.refine.dev/graphql';

export const dataProvider = NestjsDataProvider('http://localhost:3000');
