<template>
  <div style="text-align:center;" v-if="user">
    <h3>Page Not Found !! </h3>
    <h4>Please click on the above available options</h4>
    <Logout/>
    <br>
  </div>
</template>

<script>
import Logout from '@/components/Logout.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from '@/router/index.js';


export default {
    name:"NotFound" ,

    components:{
        Logout
    },

    data() {
        return {
            user:false,        
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