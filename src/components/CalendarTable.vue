<template>
    <h1>{{username}}'s Calendar</h1>
</template>

<script>
import { getAuth, onAuthStateChanged} from "firebase/auth";
  export default {
    beforeMount() {
    const auth = getAuth();
    this.username = auth.currentUser.displayName;
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
  }

</script>

<style scoped>

</style>