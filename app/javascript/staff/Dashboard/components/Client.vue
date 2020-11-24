<template lang="pug">
  q-dialog(
    v-model='showClientDetails'
    persistent
    @hide="pushToClients")
    q-card
      q-bar.bg-primary.text-white
        span Edit Client
      q-card-section
          #update-client
            #errors(v-if="errors.length")
              div(v-for="error in errors") {{ error }}
            .col-12
              q-input(v-model="client.fullname" placeholder="full name")
              q-input(v-model="client.phone" placeholder="phone")
              q-input(v-model="client.email" placeholder="email")
      q-card-actions(align='right')
        q-btn(flat label='Update' color='primary' @click="updateClient")
        q-btn(flat label='Cancel' color='primary' v-close-popup)
  </template>

<script>
import loadingMixin from 'Staff/mixins/loaders'

  export default {
    name: 'Client',
    mixins: [loadingMixin],
    data: function () {
      return {
        showClientDetails: true,
        client: {}
      }
    },

    computed: {
      id () {
        return this.$route.params.id
      }
    },
    created () {
      this.$api.clients.show(this.id)
        .then(({ data }) => {
            this.client = data.client
          })
          .catch(() => (this.error = true))
          .finally(() => (this.loading = false))
    },
    methods : {
      updateClient () {
        this.$api.clients.update(this.client)
        .then(({ data }) => {
          this.$emit('pushClient', data.client)
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false))
      },
      pushToClients () {
        this.$router.push({ name: 'clients' })
      }
    }
  }
</script>
