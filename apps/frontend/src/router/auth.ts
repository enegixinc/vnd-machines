import { RouteRecordRaw } from 'vue-router';
export const authLinks :RouteRecordRaw[] = [
    {
        path: '/auth/signin',
        name: 'signin',
        component: () => import('@/pages/auth/signin/TheIndex.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/signup',
        name: 'signup',
        component: () => import('@/pages/auth/signup/TheIndex.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/password-reset',
        name: 'password-reset',
        component: () => import('@/pages/auth/passwordReset/TheIndex.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/lock-screen',
        name: 'lock-screen',
        component: () => import('@/pages/auth/LockScreen/TheIndex.vue'),
        meta: { layout: 'auth' },
    },
]
