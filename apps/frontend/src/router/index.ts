import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/index.vue';

const routes: RouteRecordRaw[] = [
    // dashboard
    { path: '/', name: 'home', component: HomeView },
    // -----------------auth
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
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
