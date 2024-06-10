import { RouteRecordRaw } from 'vue-router';
export const brandsLinks :RouteRecordRaw[] = [
    {
        path: '/brands',
        name: 'manageBrands',
        component: () => import('@/pages/brands/TheIndex.vue'),
    },
    {
        path: '/brands/deleted',
        name: 'deletedBrands',
        component: () => import('@/pages/brands/DeletedBrands/TheIndex.vue'),
    },
    {
        path: '/brands/add',
        name: 'addBrands',
        component: () => import('@/pages/brands/addBrands/Theindex.vue'),
    },
    {
        path: '/brands/edit/:id',
        props: true,
        name: 'edit-brand',
        component: () => import('@/pages/products/editProduct/TheIndex.vue'),
    }
]
