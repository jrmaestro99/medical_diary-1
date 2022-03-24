import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Reminders from '@/views/Reminders.vue'
import HealthStatus from '@/views/HealthStatus.vue'
import NotFound from '@/views/NotFound.vue'
import Login from '@/components/Login.vue'
import Landing from '@/components/Landing.vue'

const routes = [
    {
        path: "/",
        name: "Landing",
        component: Landing
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/about",
        name: "About",
        component: About
    },
    {
        path: '/reminders',
        name: 'Reminders',
        component: Reminders
    },
    {
        path: '/graph',
        name: 'Health Status Checker Graph',
        component: HealthStatus
    },
    {
        path: '/:catchAll(.*)',
        name:'NotFound',
        component: NotFound,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router