import { RouteRecordRaw } from 'vue-router';

export const productsLinks: RouteRecordRaw[] = [
    {
        path: '/products',
        name: 'manageProducts',
        component: () => import('@/pages/products/TheIndex.vue'),
    },
    {
        path: '/products/deleted',
        name: 'deletedProducts',
        component: () => import('@/pages/products/DeletedProducts/TheIndex.vue'),
    },
    {
        path: '/products/add',
        name: 'addProduct',
        component: () => import('@/pages/products/addProduct/TheIndex.vue'),
    },
    {
        path: '/products/edit/:id',
        props: true,
        name: 'edit-product',
        component: () => import('@/pages/products/editProduct/TheIndex.vue'),
    },
];
