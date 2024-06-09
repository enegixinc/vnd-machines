import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import { useUser } from '@/stores/user';
import appSetting from '@/app-setting';
import { authLinks } from '@/router/auth';
import { userLinks } from '@/router/users';
import { contractsLinks } from '@/router/contracts';
import { productsLinks } from '@/router/products';
import { categoriesLinks } from '@/router/categories';
import { brandsLinks } from '@/router/brands';
import { errorsLinks } from '@/router/errors';

const routes: RouteRecordRaw[] = [
    // dashboard
    { path: '/', name: 'home', component: () => import('@/pages/TheIndex.vue') },
    ...userLinks,
    ...authLinks,
    ...contractsLinks,
    ...productsLinks,
    ...categoriesLinks,
    ...brandsLinks,
    ...errorsLinks,
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
    const user = useUser();

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    if (to.meta.pageGlobal) {
        next(true);
    } else if (to.meta.requiresUnAuth && user.isAuthenticated) {
        next({ name: 'home' });
    } else if (!to.meta.requiresUnAuth && !user.isAuthenticated) {
        next({ name: 'signin' });
    } else {
        next(true);
    }
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
