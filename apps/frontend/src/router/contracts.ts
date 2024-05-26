import { RouteRecordRaw } from 'vue-router';
export const contractsLinks :RouteRecordRaw[] = [
    {
        path: '/contracts',
        name: 'manage-contracts',
        component: () => import('@/pages/contracts/TheIndex.vue'),
    },
]
