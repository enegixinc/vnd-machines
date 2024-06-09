import { RouteRecordRaw } from 'vue-router';

export const errorsLinks: RouteRecordRaw[] = [
    {
        path: '/not-found',
        name: 'notFound',
        component: () => import('@/pages/errors/NotFound.vue'),
        meta: { layout: 'auth', requiresUnAuth: true },
    },
];
