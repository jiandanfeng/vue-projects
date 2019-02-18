import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    user: {},
    status: '',
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    Login ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，
        // 利用commit修改store的state属性，并将token存放在localStorage中
        axios.post('/api/login', user).then(res => {
          const token = res.data.token
          const user = res.data.user
          console.log(res)
          localStorage.setItem('token', token)
          // 每次请求接口时，需要在headers添加对应的Token验证
          axios.defaults.headers.common['Authorization'] = token
          // 更新token
          commit('auth_success', token, user)
          resolve(res)
        }).catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/logout').then(res => {
          // removeIsLogin()
          localStorage.removeItem('loginUsername')
          // 移除之前在axios头部设置的token
          delete axios.defaults.headers.common['Authorization']
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
    // 用!!将state.token强制转换为布尔值，若state.token存在且不为空(已登陆)则返回true，反之返回false
    isLoggedIn: state => {
      if (!state.token) {
        return false
      }
      return true
    },
    authStatus: state => state.status
  }
})

// 拦截器
axios.interceptors.response.use(res => res, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401: this.$store.dispatch('Logout')
    }
  }
})

export default store
