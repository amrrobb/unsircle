<template>
  <div id="app">
    <Navbar class="mb-5 pb-5"/>
    <router-view/>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: { Navbar },
    computed: {
    ...mapState(['isLoggedIn'])
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('loginCheck', true)
    } 
    else {
      this.$store.dispatch('loginCheck', false)
    }
  }
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

#navbar {
  margin-bottom: 4%;
}

#navbar a {
  color: #d4dee9;
}

#navbar a.router-link-exact-active {
  font-weight: bold;
  color: #ffffff;
}
</style>
