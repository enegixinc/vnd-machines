import { RouteRecordRaw } from 'vue-router';

export const machinesLinks: RouteRecordRaw[] = [
    {
        path: '/machines',
        name: 'manageMachines',
        component: () => import('@/pages/machines/TheIndex.vue'),
    },
    {
        path: '/machines/fill',
        name: 'fillingMachines',
        component: () => import('@/pages/machines/fillMachine/TheIndex.vue')
    },
    // {
    //     path: '/machines/:id',
    //     props: true,
    //     name: 'show-order',
    //     component: () => import('@/pages/products/editProduct/TheIndex.vue'),
    // },
];
