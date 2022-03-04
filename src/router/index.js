import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import HelloWorld from '@/views/HelloWorld.vue'

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
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router