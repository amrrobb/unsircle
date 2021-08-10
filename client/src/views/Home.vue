<template>
  <div id="home" > 
    <div v-show="!isLoggedIn">
      <h2>Welcome to this Application</h2>
      
      <div class="d-flex justify-content-center mt-5">
        <div>
            <img class="w-25" src="../assets/home.png" alt="" srcset="">
            
            <h4>Please login to continue</h4>
            <router-link :to="{name: 'Login'}">
              <button type="button" class="btn btn-outline-primary btn-lg">Login</button>
            </router-link>
        </div>
      </div>
    </div>

    <div v-show="isLoggedIn">
      <div class="text-center my-3 p-2">
        <h3 class="display-6">
          Item List
        </h3>
      </div>
        <router-link :to="{name: 'Add'}">
            <button type="button" class="btn btn-outline-primary btn-lg" >Add Item</button>
        </router-link>
      <div class="container d-flex justify-content-center">

        <table class="table" v-show="items">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(el, i) in items" :key="el.id">
              <th scope="row">{{i+1}}</th>
              <td>{{el.name}}</td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                  <router-link :to="{name: 'Detail', params: { id: el.id }}">
                    <button type="button" class="btn btn-outline-primary">View</button>
                  </router-link>
                  <router-link :to="{name: 'Edit', params: { id: el.id }}">
                    <button type="button" class="btn btn-outline-primary">Edit</button>
                  </router-link>
                  <button type="button" class="btn btn-outline-primary" @click.prevent="deleteItem({id: el.id})">Delete</button>
                  
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   
    </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import FoodList from '@/components/FoodList.vue'
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  components: {
    FoodList
  },
  computed: {
    ...mapState(['items', 'isLoggedIn', ]),
  },
  methods: {
    ...mapActions(['fetchItem', 'deleteItem']),

  },
  created() {
    if (this.isLoggedIn) {
      this.fetchItem()
    }
  }

}
</script>
