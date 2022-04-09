import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Reminders from '@/views/Reminders.vue'
import Note from '@/views/Note.vue'
import HealthStatus from '@/views/HealthStatus.vue'
import NotFound from '@/views/NotFound.vue'
import Login from '@/components/Login.vue'
import Landing from '@/components/Landing.vue'
import QuickAccess from "@/views/QuickAccess.vue";
import Calendar from '@/views/Calendar.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth"

function isAuthenticated(to) {
    // const routeNameList = ["Landing", "Login", "About", "Reminders", "Note", "Graph", "Links", "Calendar"];
    // if (!routeNameList.includes(to.name)) {
    //     return {
    //         path: '/error',
    //         name:'NotFound',
    //         component: NotFound,
    //     }
    // }
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (!user && to.name !== 'Login') {
            console.log("==> Redirecting to Login");
            return {
                path: "/login",
                name: "Login",
                component: Login
            }
        }
    })
}

const routes = [
    {
        path: "/",
        name: "Landing",
        component: Landing
    },
    // {
    //     path: "/login",
    //     name: "Login",
    //     component: Login
    // },
    {
        path: "/about",
        name: "About",
        component: About,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/reminders',
        name: 'Reminders',
        component: Reminders,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/note',
        name: 'Note',
        component: Note,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/graph',
        name: 'Graph',
        component: HealthStatus,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/links',
        name: 'Links',
        component: QuickAccess,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: Calendar,
        beforeEnter: [isAuthenticated]
    },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404',
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router