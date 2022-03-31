<template>
  <FuncBar/>
  <div id="maincontainer">
    <NavBar/>
    <div v-if='user'>
        <div id='content'>
            <p class='heading'>Welcome to Medical Diary</p>
            <p class='content'>Access to self care, health status, therapy and habit formation all in one app<br>
            We aim to help you develop a better self</p>
        </div>
    </div>
  </div>
  
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FuncBar from "@/components/FuncBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      NavBar,
      FuncBar
  },
  beforeMount() {
    const auth = getAuth();      
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    })
  }
}
</script>

<style>
@import url(http://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin,latin-ext);

* {
    font-family: 'Lato';
}

body {
  width: 60%;
  margin: auto;
}

#maincontainer {
  margin-top: 8rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

#content {
  padding: 4rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border: 1px solid #444c56;
  border-top: none;
  color: #ADBAC7;
}

.heading {
  font-size: 2.5rem;
  font-weight: bold;
}

.content {
  font-size: 1.28rem;
  font-style: italic;
}

</style>