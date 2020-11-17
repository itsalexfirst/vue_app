import Vue from 'vue'
import axios from 'axios'

let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

const api = {
  dashboard: {
    index: () => axios.get('/staff/dashboard')
  },
  clients: {
    index: () => axios.get('/staff/clients'),
    create: (client) => axios.post('/staff/clients', { client }),
    delete: (client) => axios.delete(`/staff/clients/${client.id}`, { client })
  }
}

Vue.prototype.$api = api
