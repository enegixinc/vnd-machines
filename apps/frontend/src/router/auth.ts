import { RouteRecordRaw } from 'vue-router';
export const authLinks :RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'signin',
        component: () => import('@/pages/auth/signin/TheIndex.vue'),
        meta: { layout: 'auth',requiresUnAuth:true },
    },
    {
        path: '/auth/signup',
        name: 'signup',
        component: () => import('@/pages/auth/signup/TheIndex.vue'),
        meta: { layout: 'auth',requiresUnAuth:true },
    },
    {
        path: '/forgetPassword',
        name: 'password-reset',
        component: () => import('@/pages/auth/passwordReset/TheIndex.vue'),
        meta: { layout: 'auth',requiresUnAuth:true  },
    },
    {
        path: '/auth/lock-screen',
        name: 'lock-screen',
        component: () => import('@/pages/auth/LockScreen/TheIndex.vue'),
        meta: { layout: 'auth' },
    },
]
