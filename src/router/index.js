import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Reminders from '@/views/Reminders.vue'
import HealthStatus from '@/views/HealthStatus.vue'

const routes = [
    {
        path: '/',
        name: 'About',
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
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router