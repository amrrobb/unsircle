<template>
  <div class="container px-3 ">
      <div class="row row-cols-10 g-lg-3">
        <FoodItem v-for="el in foodRows" :key="el.id" :el="el" :currentPage="currentPage" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FoodItem from '@/components/FoodItem.vue'
export default {
  name: 'FoodList',
  components: { FoodItem },
  computed: {
    ...mapState(['food']),
    foodRows() {
      return this.food.rows
    },
    currentPage() {
      return this.food.currentPage
    }
  }
}
</script>

<style>

</style>
