<template>
  <div id="nav">
    <router-link to="/">Hello World</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/reminders">My Reminders</router-link> |
    <router-link to="/graph">Health Status Graph</router-link> 
    
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: blueviolet;
}

#nav a.router-link-exact-active {
  color: rgb(0, 150, 100);
}
</style>
