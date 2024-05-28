import { RouteRecordRaw } from 'vue-router';
export const productsLinks :RouteRecordRaw[] = [
    {
        path: '/products',
        name: 'manageProducts',
        component: () => import('@/pages/products/TheIndex.vue'),
    },
    {
        path: '/deleted-products',
        name: 'deletedProducts',
        component: () => import('@/pages/products/DeletedProducts/TheIndex.vue'),
    },
]
