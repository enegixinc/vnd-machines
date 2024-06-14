import { RouteRecordRaw } from 'vue-router';

export const categoriesLinks: RouteRecordRaw[] = [
    {
        path: '/categories',
        name: 'manageCategories',
        component: () => import('@/pages/categories/TheIndex.vue'),
    },
    {
        path: '/categories/deleted',
        name: 'deletedCategories',
        component: () => import('@/pages/categories/DeletedCategories/TheIndex.vue'),
    },
    {
        path: '/categories/add',
        name: 'addCategories',
        component: () => import('@/pages/categories/addCategory/index.vue'),
    },
    {
        path: '/categories/edit/:id',
        props: true,
        name: 'edit-category',
        component: () => import('@/pages/categories/editCategory/TheIndex.vue'),
    }
];
