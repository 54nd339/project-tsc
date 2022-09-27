import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), 
    routes: [ 
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/admin/:id',
            name: 'Admin',
            component: () => import('../views/Admin.vue')
        },
        {
            path: '/student/:id',
            name: 'Student',
            component: () => import('../views/Student.vue')
        },
        {
            path: '/teacher/:id',
            name: 'Teacher',
            component: () => import('../views/Teacher.vue')
        },
        {
            path: '/:pathMatch(.*)*', // '/:catchAll(.*)'
            name: 'NotFound',
            component: () => import('../views/NotFound.vue')
        }
    ]
})

export default router
