import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../apis/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    itemOne: {},
    isLoggedIn: false,
  },
  mutations: {
    LOGIN_STATUS (state, value) {
      state.isLoggedIn = value
    },
    FETCH_ITEMS (state, data) {
      state.items = data
    },
    FETCH_ITEM_ONE (state, data) {
      state.itemOne = data
    }
  },
  actions: {
    errorHandler (context, err) {
      let { code, message } = err.response.data
      if (Array.isArray(message)) {
        message = message.join(', ')
      }
      Swal.fire(
        `Error (${code})`,
        `${message}`,
        'error'
      )
    },
    // ========== USER ============
    loginCheck ({ commit }, payload) {
      commit('LOGIN_STATUS', payload)
    },

    login: async ({ commit, dispatch }, payload) => {
      try {
        const {data} = await axios.post('/login', payload)
  
        localStorage.access_token = data.access_token
        localStorage.email = data.email

        Swal.fire(
          'Sign In Success!',
          `Welcome ${data.email}`,
          'success'
        )
      
        commit('LOGIN_STATUS', true)
        router.push({ path: '/' })
      }
      catch (err) {
        dispatch('errorHandler', err)
      }
    },
    logout ({ commit }, payload) {
      Swal.fire({
        title: 'Logout Confirmation',
        text: 'Do you want to logout?',
        showDenyButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()
          Swal.fire(
            'You already signed out!'
          )
    
          commit('LOGIN_STATUS', false)
          router.push({ path: '/' })

        } 
      })
    },

    // ========== REQUEST ============
    fetchItem: async ({commit, dispatch}, payload) => {
      try {
        const {data} = await axios.get('/barang',{
          headers: {
            access_token: localStorage.access_token
          }
        })
        commit('FETCH_ITEMS', data)
      }
      catch(err) {
        dispatch('errorHandler', err)
      }
    },
    
    fetchItemOne: async ({commit, dispatch}, payload) => {
      try {
        let {id} = payload
        const {data} = await axios.get(`/barang/${id}`,{
          headers: {
            access_token: localStorage.access_token
          }
        })
        commit('FETCH_ITEM_ONE', data)
      }
      catch(err) {
        dispatch('errorHandler', err)
      }
    },
    
    addItem: async ({commit, dispatch}, payload) => {
      try {
        const {name, category, amount, price} = payload
        const input = {name, category, amount, price}
        await axios.post('/barang', input, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        Swal.fire(
          'Add Item!',
          `Success add`,
          'success'
        )
        dispatch('fetchItem')
        router.push({ path: '/' })
      }
      catch(err) {
        dispatch('errorHandler', err)
      }
    },

    editItem: async ({commit, dispatch}, payload) => {
      try {
        const {id, name, category, amount, price} = payload
        const input = {name, category, amount, price}
        await axios.put(`/barang/${id}`, input, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        Swal.fire(
          'Edit Item!',
          `Success edit`,
          'success'
        )
        dispatch('fetchItem')
        router.push({ path: '/' })
      }
      catch(err) {
        dispatch('errorHandler', err)
      }
    },

    deleteItem: async ({commit, dispatch}, payload) => {
      try {
        const {id} = payload
        await axios.delete(`/barang/${id}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        Swal.fire(
          'Edit Item!',
          `Success delete item`,
          'success'
        )
        dispatch('fetchItem')
        router.push({ path: '/' })
      }
      catch(err) {
        dispatch('errorHandler', err)
      }
    },
  },
  modules: {

  }
})
