<template>
    <section id="register-page">
    <div class="container-fluid position-relative p-0 align-items-stretch mt-5">
        <div class="d-flex justify-content-center">
            <div class="col-7 p-0 shadow m-0">
                <img class="w-100" src="https://d2l4kn3pfhqw69.cloudfront.net/wp-content/uploads/2019/06/Decor-8-copy.jpg" alt="">
            </div>

            <div class="col-5 bg-light shadow ">
                <div class="d-flex align-items-center py-5 ">

                    <div class="container h-auto">
                        <div class="row">
                            <div class="col-lg-10 col-xl-7 mx-auto mt-5">
                                <h6 class="h2">Restospective</h6>
                                <p class="text-muted h5 my-3">Sign Up</p>
                                <div style="margin-top: 7%;">
                                  <form @submit.prevent="register">
                                    <div class="form-group mb-3">
                                        <input type="text" placeholder="Username" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" v-model="username">
                                    </div>

                                    <div class="form-group mb-3">
                                        <input type="email" placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" v-model="email">
                                    </div>
                                    <div class="form-group mb-3">
                                        <input type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-dark" v-model="password">
                                    </div>

                                    <div class="form-group mb-3">
                                        <input type="text" placeholder="Phone number" class="form-control rounded-pill border-0 shadow-sm px-4 text-dark" v-model="phoneNumber">
                                    </div>
                                    <div class="form-group mb-3">
                                        <input type="text" placeholder="Address" class="form-control rounded-pill border-0 shadow-sm px-4 text-dark" rows="3" v-model="address">
                                    </div>

                                    <button type="submit" class="btn btn-dark btn-block mb-2 rounded-pill shadow-sm form-control">Sign Up</button>

                                    <div class="text-center d-flex justify-content-between mt-4"><p>Already have account?                                       <router-link class="font-italic text-muted" :to="{name: 'Login'}" >Sign In </router-link> </p>   
                                    
                                    </div>

                                </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: ''
    }
  },
  methods: {
    ...mapActions(['changePage']),
    register () {
      const payload = {
        email: this.email,
        password: this.password,
        username: this.username,
        phoneNumber: this.phoneNumber,
        address: this.address
      }

      this.$store.dispatch('register', payload)
    }
  }
}
</script>

<style>

</style>
