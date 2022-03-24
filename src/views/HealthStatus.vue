<template>
    <NavBar/>
    <div v-if="user">
        <div id="content">
            <Chart/>
        </div>
    </div>
  
  
</template>

<script>
import Chart from "@/components/Chart.vue";
import NavBar from "@/components/NavBar.vue";
import { getAuth } from "firebase/auth";

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
  },
}
</script>

<style>
body{
  background:#1D4746;
  width: 60%;
  margin: auto;
  padding-top: 8rem;
}

#content {
  background-color: aliceblue;
  padding: 4rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  text-align: center;
}
</style>