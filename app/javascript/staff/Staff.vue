<template lang="pug">
  #app
    q-layout(view="hHh lpR fFf")
      q-header.bg-primary.text-white(elevated height-hint="98")
        q-toolbar
          q-btn(dense flat round icon="menu" @click="drawerLeft = !drawerLeft")
          q-toolbar-title
            navbar(:current_user="current_user"
                   :logout_path="logout_path")
        q-tabs(align="left")
          q-route-tab(to="/clients" label="Clients")
          q-route-tab(to="/organizations" label="Organizations")
          q-route-tab(to="/equipments" label="Equipments")
      q-drawer(show-if-above v-model="drawerLeft" side="left" bordered)
        p drawer_content
      q-page-container
        dashboard(:clients="clients"
                  :organizations="organizations"
                  :equipments="equipments")
</template>

<script>

import Navbar from 'Shared/Navbar/Navbar.vue'
import Dashboard from './Dashboard/Dashboard.vue'

export default {
  name: 'Staff',
  data: function () {
    return {
      message: 'Hello staff',
      current_user: {},
      logout_path: '/staffs/sign_out',
      clients: [],
      organizations: [],
      equipments: [],
      loading: true,
      error: false,
      drawerLeft: false
    }
  },

  created () {
    console.log(process.env.API_BASE_URL)
    this.fetchData()
    this.loading = false
  },

  methods: {
    fetchData () {
      this.loading = true
      this.$api.dashboard.index()
        .then(({ data }) => {
          this.current_user = data.current_user
          this.clients = data.clients
          this.organizations = data.organizations
          this.equipments = data.equipments
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false))
    }
  },

  components: {
    Navbar,
    Dashboard
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
