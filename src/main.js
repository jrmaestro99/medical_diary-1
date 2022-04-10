import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOut, faBell, faLink, faChartLine, faCircleInfo, faNotesMedical, faUser, faCircleExclamation, faHouse, faCalendar, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "notosans-fontface/css/notosans-fontface.css";

library.add(faSignOut, faBell, faLink, faChartLine, faCircleInfo, faNotesMedical, faUser, faCircleExclamation, faHouse, faCalendar, faPenToSquare, faXmark);
createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).use(VueChartkick).mount('#app')
