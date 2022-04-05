<template>
  <div id="nav">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :style="{
        'width': `calc(100%/${links.length})`
      }">
      <button> <font-awesome-icon v-bind:icon="link.icon"/> {{ link.name }}</button>
    </router-link>
  </div>
  
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      links: [
        { url: "/about", name: "About", icon: "circle-info"  },
        { url: "/reminders", name: "Reminders", icon: "bell" },
        { url: "/note", name: "Notes", icon: "notes-medical"  },
        { url : "/calendar", name : "Calendar", icon: "calendar"},
        { url: "/graph", name: "Graph", icon: "chart-line"  },
        { url: "/links", name: "Links", icon: "link" }
      ]
    }
  }
}
</script>

<style>

#nav {
  display: flex;
  align-content: center;
}

#nav a button {
  border: none;
  background: none;
  color: #ADBAC7;
  font-size: 18px;
  cursor: pointer;
}

#nav a {
  width: auto;
  background: #2D333B;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
  font-weight: bold;
  margin: auto;
}

#nav a:hover {
  border-bottom: .15px solid #ADBAC7;
  cursor: pointer;
}

#nav a.router-link-exact-active {
  font-weight: bolder;
  border-bottom: .2px solid #EC775C;
}

#nav a.router-link-exact-active button {
  /* color: rgb(0, 150, 100); */
  font-weight: bolder;
}
</style>
