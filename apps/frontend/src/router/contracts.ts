import { RouteRecordRaw } from 'vue-router';

export const contractsLinks: RouteRecordRaw[] = [
    {
        path: '/contracts',
        name: 'manage-contracts',
        component: () => import('@/pages/contracts/TheIndex.vue'),
    },
    {
        path: '/deleted-contracts',
        name: 'deletedContracts',
        component: () => import('@/pages/contracts/DeletedContracts/TheIndex.vue'),
    },
    {
        path: '/add-contracts',
        name: 'addContracts',
        component: () => import('@/pages/contracts/addContract/TheIndex.vue'),
    },
];
