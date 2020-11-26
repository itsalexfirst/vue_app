import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    organizations: []
  },
  mutations: {
    ORGANIZATION_TABLE (state, payload) {
      state.organizations = payload
    }
  },
  actions: {
    getOrganizations(state) {
      Vue.prototype.$api.organizations.index()
        .then((response) => {
          state.commit('ORGANIZATION_TABLE', response.data.organizations)
        })
    }
  },
  modules: {},
  plugins: []
})
