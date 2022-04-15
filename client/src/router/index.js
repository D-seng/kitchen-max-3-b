import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AddKitchen from '../views/AddKitchen.vue'
import GetKitchen from '../views/GetKitchen.vue'

import AuthGuard from '../utils/AuthGuard.js'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/add-kitchen',
        name: 'AddKitchen',
        component: AddKitchen
        // beforeEnter: AuthGuard
    },
    {
        path: '/get-kitchen',
        name: 'GetKitchen',
        component: GetKitchen,
        children: [
            {
                name: 'Meal',
                path: 'meal/:id',
                component: 'Meal'
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
