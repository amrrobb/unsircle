<template>
    <div v-if='qrcode'>
        <div class="container p-4 rounded border border-2" style="width: 50%;" >
            <div class="text-start">
                <router-link :to="{path: '/'}" class="btn btn-light"> 
                    Back to Home
                </router-link>

            </div>
            <div class="mt-1 mb-3 p-2">
                <h3 class="display-6">{{ foodOne.name }}</h3>
            </div>

            <div class="d-flex justify-content-center align-items-center px-5">
                <div class="">
                    <img :src="foodOne.imgUrl"
                    alt="Image"
                    class="rounded"
                    style="width: 15em; height:12em;"
                    />

                </div>

                <div class=" ms-5">
                    <div class="row gy-1 text-start h6">
                        <dt class="col-sm-4">Price</dt>
                        <dd class="col-sm-8">Rp. {{ foodOne.price }}</dd>

                        <dt class="col-sm-4">Category</dt>
                        <dd class="col-sm-8">{{ foodOne.Category.name}}</dd>

                        <dt class="col-sm-4">Description</dt>
                        <dd class="col-sm-8">{{ foodOne.description }}</dd>

                        <dt class="col-sm-4">Added By</dt>
                        <dd class="col-sm-8">{{ foodOne.User.email }}</dd>

                    </div>
                </div>

            </div>

            <div class="my-4 ">
                <h5>Scan it to share this delicious food</h5>
                <div>
                    QR CODE
                </div>
                <img :src="qrcode" alt="" srcset="" width="30%">
            </div>

        </div>

    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'DetailFood',
  computed: {
      ...mapState(['foodOne', 'qrcode'])
  },
  methods: {
      fetchFoodOne(id) {
          this.$store.dispatch('fetchFoodOne', id)
      },
      generateQRCode(payload) {
          this.$store.dispatch('generateQRCode', payload)
      }
  },
  created() {
      this.fetchFoodOne(this.$route.params.id)
      this.generateQRCode(this.$route.path)
    //   console.log(this.qrcode);
  }
}
</script>

<style>

</style>
