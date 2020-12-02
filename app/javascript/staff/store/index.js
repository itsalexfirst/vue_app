import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    organizations: [],
    clients: [],
    equipments: []
  },
  mutations: {
    ORGANIZATION_TABLE (state, payload) {
      state.organizations = payload
    },
    CLIENT_TABLE (state, payload) {
      state.clients = payload
    },
    EQUIPMENT_TABLE (state, payload) {
      state.equipments = payload
    }
  },
  actions: {
    getOrganizations (state) {
      Vue.prototype.$api.organizations.index()
        .then((response) => {
          state.commit('ORGANIZATION_TABLE', response.data.organizations)
        })
    },
    getClients (state) {
      Vue.prototype.$api.clients.index()
        .then((response) => {
          state.commit('CLIENT_TABLE', response.data.clients)
        })
    },
    getEqipments (state) {
      Vue.prototype.$api.equipments.index()
        .then((response) => {
          state.commit('EQUIPMENT_TABLE', response.data.equipments)
        })
    }
  },
  modules: {},
  plugins: []
})
