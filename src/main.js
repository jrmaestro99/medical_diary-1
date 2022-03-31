import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSignOut);
createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).use(VueChartkick).mount('#app')
