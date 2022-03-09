import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import HelloWorld from '@/views/HelloWorld.vue'
import Reminders from '@/views/Reminders.vue'
import HealthStatus from '@/views/HealthStatus.vue'

const routes = [
    {
        path: '/',
        name: 'Hello World',
        component: HelloWorld
    },
    {
        path: '/about',
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