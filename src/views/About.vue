<template>
  <NavBar/>
    <div v-if='user'>
        <div id='content'>
            <h3>This is an About Page</h3>
            <h2>Welcome to Medical Diary</h2>
            <h3>CPP Description: Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Suscipit eum
                natus illo ipsam eveniet in ullam, quisquam
                recusandae tenetur voluptates earum iusto non
                nulla porro? Perferendis quos dignissimos
                recusandae veritatis? </h3>
        </div>
    </div>
  
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from '@/router/index.js';

export default {
  name: 'Main',
  data() {
    return {
      links: [
        { url: "/about", name: "About" },
        { url: "/reminders", name: "My Reminders" },
        { url: "/graph", name: "Health Graph" },
      ],
      user: false
    }
  },
  components: {
      NavBar
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
@import url(http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic&subset=latin,latin-ext);
* {
    font-family: 'Noto Sans';
}
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
}

</style>