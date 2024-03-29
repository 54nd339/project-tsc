import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/db/config'
import Welcome from '@/views/Welcome.vue'

const requireAuth = (to, from, next) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (!user) {
            next({ name: 'Welcome' })
        } else {
            next()
        }
        unsubscribe();
    });
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes: [ 
        {
            path: '/',
            name: 'Welcome',
            component: Welcome,
            meta: { title: 'Talent Sprint Classes' },
            beforeEnter: (to, from, next) => {
                const role = localStorage.getItem('role')
                if (role) {
                    next({
                        name: role.charAt(0).toUpperCase() + role.slice(1),
                        params: { id: localStorage.getItem('uid') }
                    })
                } else {
                    next()
                }
            }

        },
        {
            path: '/admin/:id',
            name: 'Admin',
            component: () => import('../views/Admin.vue'),
            meta: { title: 'TSC - Admin' },
            beforeEnter: requireAuth
        },
        {
            path: '/student/:id',
            name: 'Student',
            component: () => import('../views/Student.vue'),
            meta: { title: 'TSC - Student' },
            beforeEnter: requireAuth
        },
        {
            path: '/teacher/:id',
            name: 'Teacher',
            component: () => import('../views/Teacher.vue'),
            meta: { title: 'TSC - Teacher' },
            beforeEnter: requireAuth
        },
        {
            path: '/:catchAll(.*)',
            redirect: { name: 'Welcome' }
        }
    ]
})

export default router