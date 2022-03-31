<template>
  <div id="funcnav">
    <span>Hello, {{username}}</span>
    <div id='signout' @click="signOut">
        <font-awesome-icon id='icon' icon="sign-out" size="lg"/> Logout
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: 'FuncBar',
  beforeMount() {
    const auth = getAuth();      
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.username = auth.currentUser.displayName;
      }
    })
  },
  data() {
    return {
      username: '',
    }
  },
  methods: {
    signOut() {
        let isExecuted = confirm("Do you want to logout now?");
        if (isExecuted) {
            const auth = getAuth();      
            const user = auth.currentUser;  
            signOut(auth, user);
            this.$router.push('/login'); 
        }      
    }
  }
}
</script>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic&subset=latin,latin-ext);

#funcnav {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;
    margin-top: 2rem;
    color: #ADBAC7;
    font-family: 'Noto Sans';
}

#signout {
  cursor: pointer;
}

a {
    color: #ADBAC7;
    text-decoration: none;
}
</style>