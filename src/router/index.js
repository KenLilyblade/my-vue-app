import {createRouter, createWebHashHistory} from 'vue-router'

// import todo from '@/components/todo.vue';
const routes = [
    {
        path: '/',
        name: 'waterfall',
        meta: {
            keepAlive: true,
        },
        component: () => import('@/views/waterfall/waterfall.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            keepAlive: true,
        },
        component: () => import('@/views/home/home.vue'),
    },
    {
        path: '/LianShou',
        name: 'LianShou',
        meta: {
            keepAlive: true,
        },
        component: () => import('@/components/LianShou.vue'),
    },
    {
        path: '/todo',
        name: 'Todo',
        component: () => import('@/views/todo/todo.vue'),
    },
    {
        path: '/drag',
        name: 'drag',
        component: () => import('@/views/drag/drag.vue'),
    },
    {
        path: '/axios',
        name: 'axios',
        component: () => import('@/components/axioss.vue'),
    },
    {
        path: '/aa',
        name: 'aa',
        component: () => import('@/views/dragSelect/dragSelect.vue'),
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
