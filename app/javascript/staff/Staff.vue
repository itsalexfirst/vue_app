<template lang="pug">
  #app
    template(v-if="loading")
      p Loading ...
    template(v-else)
      navbar(:current_user="current_user", :logout_path="logout_path")
      dashboard(:clients="clients" @createClient="createClient")
</template>

<script>
import axios from 'axios'
let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'
import Navbar from '../shared/Navbar/Navbar.vue'
import Dashboard from './Dashboard/Dashboard.vue'

export default {
  name: 'Staff',
  data: function () {
    return {
      message: "Hello staff",
      current_user: {},
      logout_path: "/staffs/sign_out",
      clients: [],
      loading: true,
      error: false
    }
  },

  created () {
    this.fetchData ()
    this.loading = false
  },

  methods: {
    fetchData () {
      this.loading = true
      axios.get('/staff/dashboard')
        .then(({ data }) => {
          this.current_user = data.current_user
          this.clients = data.clients
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false))
    },
    createClient (client) {
      axios.post('/staff/clients', { client })
      .then(({ data }) => {
        this.clients.push(data)
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
