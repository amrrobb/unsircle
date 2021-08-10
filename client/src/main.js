import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GoogleSignInButton from 'vue-google-signin-button-directive'

// Bootstrap
import { BootstrapVue, IconsPlugin, CardPlugin, FormPlugin, PaginationPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap/scss/bootstrap.scss'
// import 'bootstrap-vue/src/index.scss'

// Sweet alert
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CardPlugin)
Vue.use(FormPlugin)
Vue.use(PaginationPlugin)

Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  GoogleSignInButton,
  render: h => h(App)
}).$mount('#app')
