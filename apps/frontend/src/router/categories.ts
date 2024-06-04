import { RouteRecordRaw } from 'vue-router';

export const categoriesLinks: RouteRecordRaw[] = [
    {
        path: '/categories',
        name: 'manageCategories',
        component: () => import('@/pages/categories/TheIndex.vue'),
    },
    {
        path: '/deleted-categories',
        name: 'deletedCategories',
        component: () => import('@/pages/categories/DeletedCategories/TheIndex.vue'),
    },
    {
        path: '/add-categories',
        name: 'addCategories',
        component: () => import('@/pages/categories/addCategory/index.vue'),
    },
];
