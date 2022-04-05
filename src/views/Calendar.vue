<template>
  <NavBar/>
  <div v-if='user'>
    <div id='content'>
      <CalendarTable/>
        <br>
        <CalendarTableCalendar/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CalendarTable from "@/components/CalendarTable.vue";
import router from '@/router/index.js';
import CalendarTableCalendar from "@/components/CalendarTableCalendar.vue";


export default {
    name: 'Calendar',
    data() {
        return {
            user: false
        }
    },
    components: {
        CalendarTable,
        NavBar,
        CalendarTableCalendar
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
  /* background:#1D4746; */
  width: 60%;
  margin: auto;
  padding-top: 8rem;
}

#content {
  /* background-color: aliceblue; */
  padding: 4rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  text-align: center;
}
</style>