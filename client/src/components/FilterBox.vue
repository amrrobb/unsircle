<template>
<section class="container" style="width: 35%">
    <b-card
        tag="article"
        style="max-width: 18rem;"
        class="m-2"
    >
        <h5 class="text-center">Filter</h5>
        <hr>
        <b-form class="px-3" @submit.prevent="filterFields">

        <b-form-group class="mt-3" label="Name :">
            <div class="mb-1 row">
                <div class="col-sm">
                <input type="text" class="form-control form-control-sm" placeholder="e.g. food" v-model="name">
                </div>
            </div>
        </b-form-group>
        <hr>
        <b-form-group label="Category :">
            <b-form-checkbox-group v-model="categoryId">
                <div class="d-flex justify-content-between">
                    <label for="">Appetizer</label>
                    <b-form-checkbox value="1" ></b-form-checkbox>
                </div>
               <div class="d-flex justify-content-between">
                    <label for="">Main Dish</label>
                    <b-form-checkbox value="2" ></b-form-checkbox>
                </div>
                <div class="d-flex justify-content-between">
                    <label for="">Dessert</label>
                    <b-form-checkbox value="3" ></b-form-checkbox>
                </div>

            </b-form-checkbox-group>
        </b-form-group>
        <hr>
        <b-form-group class="mt-3" label="Price :">
            <div class="mb-1 row">
                <label class="col-sm-3 col-form-label">Max.</label>
                <div class="col-sm-9">
                <input type="number" class="form-control form-control-sm" placeholder="e.g. 100000" v-model="pmax">
                </div>
            </div>

            <div class="mb-1 row">
                <label class="col-sm-3 col-form-label">Min.</label>
                <div class="col-sm-9">
                <input type="number" class="form-control form-control-sm" placeholder="e.g. 10000" v-model="pmin">
                </div>
            </div>
        </b-form-group>
        <hr>
        <b-form-group class="mt-3 mb-3" label="Description :">
            <div class="mb-1 row">
                <div class="col-sm">
                <input type="price" class="form-control form-control-sm" placeholder="e.g. chicken" v-model="description">
                </div>
            </div>
        </b-form-group>

        <div class="d-flex justify-content-between">
            <b-button type="submit" variant="dark" class="form-control me-2">Submit</b-button>
            <b-button type="reset" variant="secondary" class="form-control ms-2" @click.prevent="clearFilter">Reset</b-button>
        </div>
        </b-form>

    </b-card>

</section>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'FilterBox',
    data() {
        return {
            name: "",
            categoryId: [],
            description: "",
            pmax: "",
            pmin: ""
        }
    },
    computed: {
        ...mapState(['food', 'queryFilter']),
    },
    methods: {
        filterFields() {
            let payload = {
                name: this.name,
                categoryId: this.categoryId,
                description: this.description,
                pmax: this.pmax,
                pmin: this.pmin
            }
            
            this.$store.dispatch('filterCheck', payload)
            this.$store.dispatch('fetchFood', {page: 1, query: this.queryFilter} ) 
        },
        clearFilter() {
            this.$store.dispatch('filterCheck', {})
            this.$store.dispatch('fetchFood', {page: 1})
        }   
    }
}
</script>

<style>

</style>
