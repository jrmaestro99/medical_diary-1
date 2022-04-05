<template>
  <FuncBar/>
  <div id="maincontainer">
    <NavBar/>
    <div v-if='user'>
      <div id='content'>
        <AddReminder  @added="change" />
        <br>
        <hr>
        <br>
        <Table :key="refreshComp" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FuncBar from "@/components/FuncBar.vue";
import { getAuth } from "firebase/auth";
import AddReminder from "@/components/AddReminder.vue";
import Table from "@/components/Table.vue";


export default {
    name: 'Reminders',
    data() {
        return {
            user: false,
            refreshComp:0
        }
    },
    components: {
        NavBar,
        FuncBar,
        AddReminder,
        Table
    },
    beforeMount() {
      const auth = getAuth();      
      this.user = auth.currentUser;
      if (!this.user) {
        this.$router.push('/login');
      }
    },
    methods:{
      change(){
        this.refreshComp += 1
    }
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