<template>
    <div id='maincontainer'>
      <NavBar/>
      <div v-if="user">
          <div id="content">
              <Chart/>
          </div>
      </div>
    </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import NavBar from "@/components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from '@/router/index.js';

export default {
  name: 'HealthStatus',
  components: {
      Chart,
      NavBar
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
      }  else {
        router.push('/login');
      }
    })
  }
}
</script>

<style>
body{
  width: 60%;
  margin: auto;
  /* padding-top: 8rem; */
}

#maincontainer {
  margin-top: 8rem;
}

#content {
  padding: 4rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  text-align: center;
}
</style>