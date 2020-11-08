<template lang="pug">
  #dashboard
    p {{ message }}
    #new-client
      form(v-on:submit.prevent="onSubmit")
        input(v-model="fullname" placeholder="full name")
        input(v-model="phone" placeholder="phone")
        input(v-model="email" placeholder="email")
        button(v-model="submit") Submit
</template>

<script>
import axios from 'axios'

let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

export default {
  name: 'Dashboard',
  data: function () {
    return {
      message: "Dashboard"
    }
  },
  methods: {
    onSubmit: function () {
      axios.post('/staff/clients', {
        client: {
          fullname: this.fullname,
          phone: this.phone,
          email: this.email
        }
      })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(() => (this.error = true))
      .finally(() => (this.loading = false))
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
