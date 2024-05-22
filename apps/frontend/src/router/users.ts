import { RouteRecordRaw } from 'vue-router';
export const userLinks :RouteRecordRaw[] = [
    {
        path: '/users',
        name: 'users',
        component: () => import('@/pages/users/TheIndex.vue'),
    },
]
