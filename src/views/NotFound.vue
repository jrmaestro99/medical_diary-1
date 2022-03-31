<template>
  <div style="text-align:center;" v-if="user">
    <h3>Page Not Found !! </h3>
    <h4>Please proceed to the main page</h4>
    <button @click='redirect'>Main Page</button>
    <br>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from '@/router/index.js';


export default {
    name:"NotFound",
    data() {
        return {
            user:false,        
        }
    },
    methods: {
        redirect() {
            router.push('/');
        }
    },
    beforeMount() {
        const auth = getAuth();      
        this.user = auth.currentUser;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;      
            } else {
                router.push('/login');
            }
        })
    }
}   
</script>

<style scoped>
h3, h4 {
    color: #ADBAC7;
}
</style>