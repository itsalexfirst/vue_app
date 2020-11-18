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
    update: (client) => axios.patch(`/staff/clients/${client.id}`, client),
    delete: (client) => axios.delete(`/staff/clients/${client.id}`, client)
  },
  organizations: {
    index: () => axios.get('/staff/organizations'),
    create: (organization) => axios.post('/staff/organizations', { organization }),
    delete: (organization) => axios.delete(`/staff/organizations/${organization.id}`, organization)
  }
}

Vue.prototype.$api = api
