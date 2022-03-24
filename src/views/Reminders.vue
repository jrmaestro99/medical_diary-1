<template>
  <NavBar/>
  <div v-if='user'>
    <div id='content'>
      <Table/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { getAuth } from "firebase/auth";
import Table from "@/components/Table.vue";


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
        this.user = auth.currentUser
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