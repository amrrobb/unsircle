import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favorites',
    name: 'Favorite',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "favorites" */ '../views/Favorite.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/food/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "details" */ '../views/Detail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, name)
  if ((to.name === 'Login' || to.name === 'Register') && localStorage.access_token ) {
    next({name: 'Home'})
  }
  if (to.name === 'Favorite' && !localStorage.access_token) {
    next({name: 'Home'})
  }
  if (to.name === 'Favorite' && localStorage.role != 'customer') {
    next({name: 'Home'})
  }

  next()
})

export default router
