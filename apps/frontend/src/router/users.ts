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
        path: '/users/deleted',
        name: 'deletedUsers',
        component: () => import('@/pages/users/DeletedUsers/TheIndex.vue'),
    },
    {
        path:'/users/add',
        name:'addUser',
        component: () => import('@/pages/users/addUser/TheIndex.vue'),
    },
    {
        path: '/users/edit/:id',
        props: true,
        name: 'edit-user',
        component: () => import('@/pages/users/editUser/TheIndex.vue'),
    }
]
