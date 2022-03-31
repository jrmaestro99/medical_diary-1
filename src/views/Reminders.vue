<template>
  <div id="maincontainer">
    <NavBar/>
    <div v-if='user'>
      <div id='content'>
        <Table/>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Table from "@/components/Table.vue";
import router from '@/router/index.js';


export default {
    name: 'Reminders',
    data() {
        return {
            user: false
        }
    },
    components: {
        Table,
        NavBar
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