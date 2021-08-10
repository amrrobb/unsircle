<template>
  <section id="navbar">
      <b-navbar
        toggleable="lg"
        class="shadow fixed-top"
        type="dark"
        variant="dark"
      >
        <b-navbar-brand class="px-5">Restospective</b-navbar-brand>
        <div class="container-fluid justify-content-end">
          <div class="px-4">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                  <li class="nav-item ">
                      <router-link to="/" class="nav-link" >Home</router-link>
                  </li>

                  <li class="nav-item" v-show="isLoggedIn">
                      <router-link to="/favorites" class="nav-link">My Favorites</router-link>
                  </li>

                  <li class="nav-item" v-show="isLoggedIn">
                      <a class="nav-link" @click.prevent="logout">Sign Out</a>
                  </li>

                  <li class="nav-item" v-show="!isLoggedIn">
                     <router-link to="/login" class="nav-link">Sign In</router-link>
                  </li>

                  <li class="nav-item" v-show="!isLoggedIn">
                     <router-link to="/register" class="nav-link">Sign Up</router-link>
                  </li>
              </ul>
          </div>
        </div>
      </b-navbar>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Navbar',
  methods: {
    ...mapActions(['logout'])
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('loginCheck', true)
      // this.$tore.commit('LOGIN_STATUS', true)

    } 
    else {
      this.$store.dispatch('loginCheck', false)
      // this.$tore.commit('LOGIN_STATUS', false)

    }
  }
}
</script>

<style>

</style>
