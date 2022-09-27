import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../db/config'
import Welcome from '../views/Welcome.vue'

const requireAuth = (to, from, next) => {
    let user = auth.currentUser
    if (!user) {
        next({ name: 'Welcome' })
    } else {
        next()
    }
}

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
            component: () => import('../views/Admin.vue'),
            beforeEnter: requireAuth
        },
        {
            path: '/student/:id',
            name: 'Student',
            component: () => import('../views/Student.vue'),
            beforeEnter: requireAuth
        },
        {
            path: '/teacher/:id',
            name: 'Teacher',
            component: () => import('../views/Teacher.vue'),
            beforeEnter: requireAuth
        },
        {
            path: '/:pathMatch(.*)*', // '/:catchAll(.*)'
            name: 'NotFound',
            component: () => import('../views/NotFound.vue')
        }
    ]
})

export default router
