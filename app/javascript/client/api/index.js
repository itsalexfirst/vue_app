import Vue from 'vue'
import axios from 'axios'

const token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.baseURL = process.env.API_BASE_URL

const api = {
  dashboard: {
    index: () => axios.get('/client/dashboard')
  },
  organizations: {
    index: () => axios.get('/client/organizations')
  }
}

Vue.prototype.$api = api
