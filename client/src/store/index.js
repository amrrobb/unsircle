import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../apis/axios'
import router from '../router/index'
import QRCode from '../apis/qrcode'

const queryString = require('query-string');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    food: [],
    foodOne: {},
    favorites: [],
    isLoggedIn: false,
    queryFilter: "",
    qrcode: ""
  },
  mutations: {
    LOGIN_STATUS (state, value) {
      state.isLoggedIn = value
    },
    FETCH_FOOD (state, data) {
      state.food = data
    },
    FETCH_FOODONE (state, data) {
      state.foodOne = data
    },
    FETCH_FAVORITES (state, data) {
      state.favorites = data
    },
    FILTER_CHECK (state, data) {
      state.queryFilter = data
    },
    GENERATE_QRCODE (state, data) {
      state.qrcode = data
    }
  },
  actions: {
    errorHandler (context, err) {
      let { code, message } = err.response.data
      if (Array.isArray(message)) {
        message = message.join(', ')
      }
      Vue.swal(
        `Error (${code})`,
        `${message}`,
        'error'
      )
    },
    // ========== USER ============
    loginCheck ({ commit }, payload) {
      commit('LOGIN_STATUS', payload)
    },

    login ({ commit, dispatch }, payload) {
      axios.post('/login', payload)
        .then(({ data }) => {
          localStorage.access_token = data.access_token
          localStorage.role = data.role
          localStorage.id = data.id

          Vue.swal(
            'Sign In Success!',
            `Welcome ${data.email}`,
            'success'
          )

          commit('LOGIN_STATUS', true)
          router.push({ path: '/' })
        })
        .catch(err => {
          dispatch('errorHandler', err)
        })
    },
    register ({ dispatch }, payload) {
      axios.post('/register', payload)
        .then(({ data }) => {
        // commit('REGISTER', data)
          const user = {
            email: payload.email,
            password: payload.password
          }
          dispatch('login', user)
        })
        .catch(err => {
          dispatch('errorHandler', err)
        })
    },
    logout ({ commit }, payload) {
      localStorage.clear()
      Vue.swal(
        'You already signed out!'
      )
      router.push({ path: '/' })

      commit('LOGIN_STATUS', false)
    },

    // ------------ OAuth Google ------------

    googleLogin ({ commit, dispatch }, idToken) {
      // console.log(idToken, '<<<< id token >>>>')
      axios.post('/googleLogin', {
        id_token: idToken
      })
        .then(({ data }) => {
          // console.log(data)
          localStorage.access_token = data.access_token
          localStorage.role = data.role
          localStorage.id = data.id

          Vue.swal(
            'Sign In Success!',
              `Welcome ${data.email}`,
              'success'
          )

          commit('LOGIN_STATUS', true)
          router.push({ path: '/' })
        })
        .catch(err => {
          dispatch('errorHandler', err)
        })
    },

    // ========== FOOD ============
    filterCheck({ commit, dispatch }, payload) {
      let { name, categoryId, description, pmax, pmin} = payload

      if ((pmax && pmin) &&  (pmax <= pmin)) {
        throw Vue.swal('Filter price inputs wrong', "max must be higher then min", 'error')
      }

      let query = []
      if(pmax) {
        query.push(`price[max]=${pmax}`)
      }

      if(pmin) {
        query.push(`price[min]=${pmin}`)
      }

      if(categoryId) {
        categoryId = categoryId.join(',')
        query.push(`categoryId=${categoryId}`)
      }

      if(description) {
        query.push(queryString.stringify({description}))
      }

      if(name) {
        query.push(queryString.stringify({name}))
      }

      query = query.join('&')
      commit('FILTER_CHECK', query)
    },

    fetchFood ({ commit, dispatch }, payload) {
      let { page, query } = payload

      page = page - 1
      query = (query) ? `&${query}` : ""

      let count = 0
      // ?page=${page}&size=9${query}`

      axios.get(`/food`)
      .then(({ data }) => {

        count = data.rows.length
        return axios.get(`/food?page=${page}&size=9${query}`)
      })
      .then(({ data }) => {
        data.totalItems = count
        data.totalPages = Math.ceil(count / 9)
        // console.log(data);

        commit('FETCH_FOOD', data)
      })
      .catch(err => {
        dispatch('errorHandler', err)
      })
    },
    
    fetchFoodOne ({ commit, dispatch }, payload) {
      const id = payload
      axios.get(`/food/${id}`)
        .then(({ data }) => {
          commit('FETCH_FOODONE', data)
        })
        .catch(err => {
          dispatch('errorHandler', err)
        })
    },

    // ========== FAVORITE ============

    fetchFavorites ({ commit, dispatch }, payload) {
      axios.get('/favorites',{
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('FETCH_FAVORITES', data)
        })
        .catch(err => {
          dispatch('errorHandler', err)
        })
    },
    addFavorites ({ commit, dispatch }, payload) {
      const id = payload
      axios.post(`/favorites/${id}`,{}, {
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          Vue.swal('Added food to favorites')
        })
        .catch(err => {
          dispatch('errorHandler', err)
        })
    },

    generateQRCode ({ commit, dispatch }, payload) {
      const baseURL = 'https://restospective.web.app'
      // const id = payload

      QRCode.get('/', {
        params: {
          data: `${baseURL}${payload}`          
        }
      })
      .then(({ data }) => {
        // console.log(data);
        commit('GENERATE_QRCODE', data.qrcode)
      })
      .catch(err => {
        dispatch('errorHandler', err)
      })
    }
  },
  modules: {

  }
})
