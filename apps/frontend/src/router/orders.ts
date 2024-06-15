import { RouteRecordRaw } from 'vue-router';

export const ordersLinks: RouteRecordRaw[] = [
    {
        path: '/orders',
        name: 'manageOrders',
        component: () => import('@/pages/orders/TheIndex.vue'),
    },
    // {
    //     path: '/orders/:id',
    //     props: true,
    //     name: 'show-order',
    //     component: () => import('@/pages/products/editProduct/TheIndex.vue'),
    // },
];
