<template>
    <div class="col-4">
        <div class="p-2 rounded">
        <b-card :title="el.name">
        <b-card-img
            :src="el.imgUrl"
            alt="Image"
            height="150"
            style="width: 100%">

        </b-card-img>

        <div class="d-flex justify-content-center m-2">
            <b-card-text class="bg-light border text-center rounded-pill" style="width: 70%;">
            {{ el.Category.name}}
            </b-card-text>
        </div>

        <b-card-text class="mt-3">
            Price: Rp. {{el.price}}
        </b-card-text>
        <b-card-text class="text-muted">
            {{ descriptionCard }}
        </b-card-text>

        <div class="d-flex justify-content-between">
            <router-link :to="{name: 'Detail', params: { id: el.id }}" class="me-2 btn btn-dark form-control"> Detail
            </router-link>

            <div v-if="isLoggedIn">
                <div v-if="customerCheck" >
                    <div v-if="!favCheck && !check">
                        <b-button class="btn btn-outline-dark form-control ms-2" variant="light" @click.prevent="addFavorites(el.id)" >Favorite</b-button>

                    </div>
                    <div  v-if="favCheck || check">
                        <b-button class="btn btn-dark form-control ms-2" variant="light" disabled >Favorited</b-button>

                    </div> 

                </div>
            </div>
        </div>
        </b-card>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'FoodItem', 
    data() {
        return {
            check: false
        }
    },
    props: ['el', 'currentPage'],
    computed: {
        ...mapState(['isLoggedIn']),
        descriptionCard() {
            return this.el.description.substring(0, 20) + '...'
        },
        
        customerCheck() {
            return (localStorage.role == "customer") ? true : false
        },

        favCheck() {

            let data = false
            if (this.$route.path == '/' && this.el.Favorites[0]) {
                this.el.Favorites.forEach(el => {
                    if (localStorage.id == el.userId) data = true
                });
            } 
            if (this.$route.path == '/favorites') {
                data = (localStorage.id == this.el.Favorite.userId) ? true : false
            }
            return data
            
        }

    },
    methods: {
        addFavorites(value) {
            this.check = true
            this.$store.dispatch('addFavorites', value)

        }   
    }
}
</script>

<style>

</style>
