import { RouteRecordRaw } from 'vue-router';
export const userLinks :RouteRecordRaw[] = [
    {
        path: '/users',
        name: 'users',
        component: () => import('@/pages/users/TheIndex.vue'),
    },
    {
        path: '/suppliers',
        name: 'suppliers',
        component: () => import('@/pages/users/suppliers/TheIndex.vue'),
    },
    {
        path: '/deleted-users',
        name: 'deletedUsers',
        component: () => import('@/pages/users/DeletedUsers/TheIndex.vue'),
    },
]
