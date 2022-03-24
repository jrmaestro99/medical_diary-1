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
  
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      links: [
        { url: "/about", name: "About" },
        { url: "/reminders", name: "My Reminders" },
        { url: "/graph", name: "Health Graph" },
      ]
    }
  }
}
</script>

<style>
body{
    background:#1D4746;
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

#nav a:hover {
  background: #666669;
}

#nav a.router-link-exact-active {
  background: #fff;
  font-weight: bolder;
  color: #000;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

#nav a.router-link-exact-active button {
  /* color: rgb(0, 150, 100); */
  font-weight: bolder;
  color: #000;
}
</style>
