import { RouteRecordRaw } from 'vue-router';
export const brandsLinks :RouteRecordRaw[] = [
    {
        path: '/brands',
        name: 'manageBrands',
        component: () => import('@/pages/brands/TheIndex.vue'),
    },
    {
        path: '/deleted-brands',
        name: 'deletedBrands',
        component: () => import('@/pages/brands/DeletedBrands/TheIndex.vue'),
    },
    {
        path: '/add-brands',
        name: 'addBrands',
        component: () => import('@/pages/brands/addBrands/Theindex.vue'),
    },
]
