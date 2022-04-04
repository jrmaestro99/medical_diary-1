<template>
    <FuncBar/>
    <div id='maincontainer'>
    <NavBar/>
    <div v-if="user">
        <div id="content">
            <MyNote @added="change"/>
            <NoteDisplay @added="change" :key="refreshComp"/>
        </div>
    </div>
  </div>
</template>

<script>
import MyNote from '@/components/MyNote.vue'
import NoteDisplay from '@/components/NoteDisplay.vue'
import NavBar from '@/components/NavBar.vue'
import FuncBar from "@/components/FuncBar.vue";
import { getAuth} from "firebase/auth";

export default {
  name: 'Note',
  components: {
    FuncBar,
    NavBar,
    MyNote,
    NoteDisplay
    
},

  data() {
    return{
      refreshComp:0
    }
  },
  methods:{
    change(){
      this.refreshComp+=1
    }
  },
  beforeMount() {
      const auth = getAuth();      
      this.user = auth.currentUser;
      if (!this.user) {
        this.$router.push('/login');
      }
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
  margin-bottom: 4rem;
}
</style>
