<template>
  <div id="home">
    <div class="text-center my-3 p-2">
      <h3 class="display-6">
        Food List
      </h3>
    </div>
    <div class="container d-flex justify-content-center">
      <FilterBox />
      <FoodList />
    </div>

    <nav aria-label="Page navigation example" class="mt-4">
      <div>
      <ul class="pagination justify-content-center" >
        <li class="page-item disabled" v-if="currentPage == 1">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true" >Previous</a>
        </li>
        <li class="page-item" v-if="currentPage != 1">
          <a class="page-link" href="#" tabindex="-1" @click.prevent="fetchFood({page: currentPage-1})">Previous</a>
        </li>

        <li class="page-item" v-for="n in totalPages" :key="n">
          <a class="page-link" @click.prevent="fetchFood({page: n})"> {{ n }} </a>
        </li>

        <li class="page-item " v-if="currentPage != totalPages">
          <a class="page-link" href="#" tabindex="-1" @click.prevent="fetchFood({page: currentPage+1})">Next</a>
        </li>
        <li class="page-item disabled" v-if="currentPage == totalPages">
          <a class="page-link" href="#" tabindex="-1">Next</a>
        </li>
      </ul>
      </div>
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import FilterBox from '@/components/FilterBox.vue'
import FoodList from '@/components/FoodList.vue'
export default {
  name: 'Home',
  data() {
    return {
      currentPage: 1,
      // totalItems: this.totalItems,

    }
  },
  components: {
    FilterBox, FoodList
  },
  computed: {
    ...mapState(['food', 'queryFilter']),
    totalPages() {
      return this.food.totalPages
    }

  },
  methods: {
    changeCurrentPage(value) {
      this.currentPage = value
    },
    fetchFood(payload) {
      // console.log(this.queryFilter);
      this.$store.dispatch('fetchFood', {page: payload.page, query: this.queryFilter} ) 
      this.changeCurrentPage(payload.page)
    }

  },
  created() {
    this.fetchFood({page: 1, query: this.queryFilter})
    
  }

}
</script>
