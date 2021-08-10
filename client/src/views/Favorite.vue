<template>
    <div id="favorite">
        <div class="text-center my-3 p-2">
            <h3 class="display-6">My Favorites</h3>
        </div>

        <div class="container p-x" style="width: 55%;" v-show="checkFav" >
            <div class="row row-cols-10 g-lg-3"> 
                <FoodItem v-for="el in favFood" :key="el.id" :el="el" />
            </div>
        </div>
        <div v-show="!checkFav">
            <h2>
                You don't have any favorites food
            </h2>
        </div>
    </div>
</template>

<script>
import FoodItem from '@/components/FoodItem.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MyFavorites',
  components: {
    FoodItem
  },
  computed: {
    ...mapState(['favorites']),
    favFood() {
        return this.favorites
    },
    checkFav( )  {
        return (!this.favFood.length) ? false : true
    }
  },
  methods: {
      ...mapActions(['fetchFavorites'])
  },
  created() {
      this.fetchFavorites()
  }
}
</script>
