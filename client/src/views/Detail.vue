<template>
    <div class="container p-4 rounded border border-2" style="width: 50%;" >
        <div class="text-start">
            <router-link :to="{path: '/'}" class="btn btn-light"> 
                Back to Home
            </router-link>

        </div>
            <!-- {{JSON.stringify(itemOne)}} -->
        <div v-if="itemOne.id">
            <div class="mt-1 mb-3 p-2">
                <h4 class="display-6">{{ itemOne.name }}</h4>
            </div>

            <div class="d-flex justify-content-center align-items-center px-5">
                <div class=" ms-5">
                    <div class="row gy-1 text-start h6">
                        <dt class="col-sm-4">Name</dt>
                        <dd class="col-sm-8">{{ itemOne.name }}</dd>

                        <dt class="col-sm-4">Category</dt>
                        <dd class="col-sm-8">{{ itemOne.category}}</dd>

                        <dt class="col-sm-4">Amount</dt>
                        <dd class="col-sm-8">{{ itemOne.amount }}</dd>

                        <dt class="col-sm-4">Price</dt>
                        <dd class="col-sm-8">{{ itemOne.price }}</dd>



                    </div>
                </div>
            </div>
        </div>
        <div v-if="!itemOne.id">
            <div class="mt-1 mb-3 p-2">
                <h4 class="display-6">Item Not Found</h4>
            </div>
        </div>

    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'DetailItem',
  computed: {
      ...mapState(['itemOne'])
  },
  methods: {
      ...mapActions(['fetchItemOne']),
  },
  created() {
      this.fetchItemOne({id: this.$route.params.id})
  }
}
</script>

<style>

</style>
