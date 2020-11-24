<template lang="pug">
  #app
    q-layout(view="hHh lpR fFf")
      q-header.bg-primary.text-white(elevated height-hint="98")
        q-toolbar
          q-btn(dense flat round icon='menu' @click='drawerLeft = !drawerLeft')
          q-toolbar-title
            navbar(:current_user="current_user", :logout_path="logout_path")
      q-drawer(show-if-above v-model='drawerLeft' side='left' bordered)
        p drawer_content
      q-page-container
        dashboard(:organizations="organizations")
</template>

<script>

import Navbar from 'Shared/Navbar/Navbar.vue'
import Dashboard from './Dashboard/Dashboard.vue'

export default {
  name: 'Client',
  data: function () {
    return {
      message: "Hello client",
      current_user: {},
      logout_path: "/clients/sign_out",
      organizations: [],
      loading: true,
      error: false,
      drawerLeft: false
    }
  },

  created () {
    this.fetchData ()
    this.loading = false
  },

  methods: {
    fetchData () {
      this.loading = true
      this.$api.dashboard.index()
        .then(({ data }) => {
          this.current_user = data.current_user
          this.organizations = data.organizations
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
