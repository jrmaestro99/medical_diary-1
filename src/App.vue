<template>
  <div id="nav">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :style="{
        'width': `calc(100%/${links.length})`
      }">
      <button>{{ link.name }}</button>
    </router-link>
  </div>
  <div id="routerview">
    <router-view/>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      links: [
        { url: "/", name: "About" },
        { url: "/reminders", name: "My Reminders" },
        { url: "/graph", name: "Health Graph" },
      ]
    }
  }
}
</script>

<style>
body{
    background: #16a085;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  width: 60%;
  margin-top: 10rem;
}
#nav {
  display: flex;
  align-content: center;
}

#nav a button {
  border: none;
  background: none;
  color:#fff;
  font-size: 18px;
}

#nav a {
  width: auto;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  background: #343436;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-weight: bold;
  color: #fff;
  margin: auto 0;
}

#nav a.router-link-exact-active {
  /* color: rgb(0, 150, 100); */
  background: #fff;
  font-weight: bolder;
  color: #000;
  box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

#nav a.router-link-exact-active button {
  /* color: rgb(0, 150, 100); */
  font-weight: bolder;
  color: #000;
}

#routerview {
  padding: 3rem 0;
  margin-top: -5px;
  background-color: #fff;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>
