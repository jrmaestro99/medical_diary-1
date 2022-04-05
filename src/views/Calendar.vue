<template>
  <FuncBar/>
  <div id='maincontainer'>
    <NavBar/>
    <div v-if='user'>
      <div id='content'>
        <CalendarTable/>
          <br>
          <CalendarTableCalendar/>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FuncBar from "@/components/FuncBar.vue";
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
        FuncBar,
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
  width: 60%;
  margin: auto;
}

#maincontainer {
  margin-top: 8rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
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