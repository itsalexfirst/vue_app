<template lang="pug">
  #dashboard
    clients(:clients="clients" @deleteClient="deleteClient" @addClient="confirm = true")

    q-dialog(v-model='confirm', persistent)
      q-card
        q-card-section.row.items-center
          span.q-ml-sm Add Client
          #new-client
            #errors(v-if="errors.length")
              div(v-for="error in errors") {{ error }}
            form(v-on:submit.prevent="onSubmit")
              input(v-model="fullname" placeholder="full name")
              input(v-model="phone" placeholder="phone")
              input(v-model="email" placeholder="email")
              button Submit
        q-card-actions(align='right')
          q-btn(flat, label='Cancel', color='primary', v-close-popup)
</template>

<script>
import Clients from './Client/Clients.vue'

export default {
  name: 'Dashboard',
  data: function () {
    return {
      message: "Dashboard",
      errors:[],

      confirm: false,

      fullname: "",
      phone: "",
      email: ""
    }
  },
  methods: {
    onSubmit: function () {
      this.errors = [];
      if (!this.fullname.match(/\w{5,}/)) {
        this.errors.push("Enter name")
      }
      if (!this.phone.match(/\d+/)) {
        this.errors.push("Enter phone")
      }
      if (!this.email.match(/^\S+@\S+\.\S+$/)) {
        this.errors.push("invalid email")
      }
      if (!this.errors.length) {
         this.$emit ('createClient', {
          fullname: this.fullname,
          phone: this.phone,
          email: this.email
        })
      }
    },
    deleteClient (client) {
      console.log(client)
      this.$api.clients.delete(client)
      .then(() => {
        this.clients.pop(client)
      })
      .catch(() => (this.error = true))
      .finally(() => (this.loading = false))
    }
  },

  props: {
    clients: {
      type: Array,
      required: true
    }
  },

  components: {
    Clients
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
