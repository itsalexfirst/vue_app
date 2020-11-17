<template lang="pug">
  #dashboard
    #new-client
      #errors(v-if="errors.length")
        div(v-for="error in errors") {{ error }}
      form(v-on:submit.prevent="onSubmit")
        input(v-model="fullname" placeholder="full name")
        input(v-model="phone" placeholder="phone")
        input(v-model="email" placeholder="email")
        button Submit
    clients(:clients="clients")
</template>

<script>
import Clients from './Client/Clients.vue'

export default {
  name: 'Dashboard',
  data: function () {
    return {
      message: "Dashboard",
      errors:[],
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
