import Vue from 'vue'
import axios from 'axios'

let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.API_BASE_URL

const api = {
  dashboard: {
    index: () => axios.get('/staff/dashboard')
  },
  clients: {
    index: () => axios.get('/staff/clients'),
    show: (id) => axios.get(`/staff/clients/${id}`),
    create: (client) => axios.post('/staff/clients', { client }),
    update: (client) => axios.patch(`/staff/clients/${client.id}`, client),
    delete: (client) => axios.delete(`/staff/clients/${client.id}`, client),
    add_organization: (client, organization) => axios.post(`/staff/clients/${client.id}/add_organization`, { organization })
  },
  organizations: {
    index: () => axios.get('/staff/organizations'),
    show: (id) => axios.get(`/staff/organizations/${id}`),
    create: (organization) => axios.post('/staff/organizations', { organization }),
    update: (organization) => axios.patch(`/staff/organizations/${organization.id}`, organization),
    delete: (organization) => axios.delete(`/staff/organizations/${organization.id}`, organization)
  },
  equipments: {
    index: () => axios.get('/staff/equipments'),
    show: (id) => axios.get(`/staff/equipments/${id}`),
    create: (equipment) => axios.post('/staff/equipments', { equipment }),
    update: (equipment) => axios.patch(`/staff/equipments/${equipment.id}`, {
      equipment: {
        id: equipment.id,
        title: equipment.title,
        category: equipment.category,
        number: equipment.number,
        organization_id: equipment.organization.id
      }
      }),
    delete: (equipment) => axios.delete(`/staff/equipments/${equipment.id}`, equipment)
  }
}

Vue.prototype.$api = api
