<template>
  <section id="form-page">
        
    <div class="container p-3 bg-light" style="width: 50%; margin-top: 5%;">
        <div class="text-center p-2 mt-4"> 
            <h3>Edit Item</h3>
        </div>
        <div class="p-3">
        <form style="width: 60%;" class="mx-auto" @submit.prevent="formEvent" ref="form">
            
            <div class="my-3 row">
            <label for="edit-name" class="col-sm-3 col-form-label">Name</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="add-name" placeholder="Name..." required v-model="name">
            </div>
            </div>

            <div class="my-3 row">
            <label for="add-description" class="col-sm-3 col-form-label">Category</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="add-description" placeholder="Category..." required v-model="category" />
            </div>
            </div>  

            <div class="my-3 row">
            <label for="add-price" class="col-sm-3 col-form-label">Amount</label>
            <div class="col-sm-9">
                <input type="number" class="form-control" id="add-price" placeholder="Min. 1..." required v-model="amount" >
            </div>
            </div>  

            <div class="my-3 row">
            <label for="add-price" class="col-sm-3 col-form-label">Price</label>
            <div class="col-sm-9">
                <input type="number" class="form-control" id="add-price" placeholder="Min. 1..." required v-model="price" >
            </div>
            </div>            

            <div class="d-flex justify-content-between mt-5 mb-4">
            
            <router-link :to="{path: '/'}" class="btn btn-outline-dark form-control form-control-sm" style="margin-right: 5%;" >
                Cancel
            </router-link>

            <button type="submit" class="btn btn-outline-primary form-control form-control-sm">Submit</button>

            </div>

        </form>
        </div>

    </div>
    </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    name: "FormEdit",
    data() {
        return {
            name: "",
            amount: "",
            price: "",
            category: "" 

        }
    },
    computed: {
      ...mapState(['itemOne'])
    },
    watch: {
        itemOne (newVal) {
            if (newVal) {
                newVal = {...newVal}
                this.name = newVal.name
                this.amount = newVal.amount
                this.price = newVal.price
                this.category = newVal.category
            }
        }
    },
    methods: {
         ...mapActions(['editItem', 'fetchItemOne']),
        formEvent () {
            let payload = {
                name: this.name,
                amount: this.amount,
                price: this.price,
                category: this.category,
                id: this.$route.params.id
            }

            this.editItem(payload)
        },       
    }, 
    created() {
        this.fetchItemOne({id: this.$route.params.id})
    }
}
</script>

<style>

</style>