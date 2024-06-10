import { RouteRecordRaw } from 'vue-router';

export const contractsLinks: RouteRecordRaw[] = [
    {
        path: '/contracts',
        name: 'manage-contracts',
        component: () => import('@/pages/contracts/TheIndex.vue'),
    },
    {
        path: '/contracts/deleted',
        name: 'deletedContracts',
        component: () => import('@/pages/contracts/DeletedContracts/TheIndex.vue'),
    },
    {
        path: '/contracts/add',
        name: 'addContracts',
        component: () => import('@/pages/contracts/addContract/TheIndex.vue'),
    },
    {
        path: '/contracts/edit/:id',
        props: true,
        name: 'edit-contract',
        component: () => import('@/pages/contracts/editContract/TheIndex.vue'),
    }
];
