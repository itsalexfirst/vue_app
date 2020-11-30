<template lang="pug">
  #clients
    q-table(
      title="Clients"
      :data="clients"
      :columns="columns"
      row-key="fullname"
      selection="single"
      :selected.sync="selected")

    q-btn-group(push)
      q-btn(push label="New" icon="add" @click="addClient")
      q-btn(push v-if="selected.length" label="Edit" icon="edit" @click="updateClient")
      q-btn(push v-if="selected.length" label="Delete" icon="delete" @click="deleteClient")
      q-btn(push v-if="selected.length" label="Add organization" icon="home" @click="assignOrganization")
    router-view(@push-client="pushClient")

</template>

<script>
export default {
  name: 'Clients',
  data: function () {
    return {
      columns: [
        { name: 'fullname', field: 'fullname', required: true, label: 'Full Name', align: 'left' },
        { name: 'phone', field: 'phone', required: true, label: 'Phone', align: 'left' },
        { name: 'email', field: 'email', required: true, label: 'E-Mail', align: 'left' }
      ],
      selected: [],
      message: 'Clients'
    }
  },
  computed: {
    clients () {
      return this.$store.state.clients
    },
    selectedClient: function () {
      return this.selected[0]
    }
  },

  mounted () {
    this.$store.dispatch('getClients')
  },

  methods: {
    deleteClient: function () {
      const client = this.selectedClient
      const index = this.clients.findIndex(x => x.id === client.id)
      this.$api.clients.delete(client)
        .then(() => {
          const clients = this.clients
          clients.splice(index, 1)
          this.$store.commit('CLIENT_TABLE', clients)
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false))
    },
    addClient: function () {
      this.$router.push({ name: 'new_client' })
    },
    updateClient: function () {
      const id = this.selectedClient.id
      this.$router.push({ name: 'client', params: { id } })
    },
    pushClient: function (client) {
      const index = this.clients.findIndex(x => x.id === client.id)
      const clients = this.clients
      if (index !== -1) {
        clients.splice(index, 1, client)
      } else {
        clients.push(client)
      }
      this.$store.commit('CLIENT_TABLE', clients)
    },
    assignOrganization: function () {
      this.$emit('assign-organization', this.selectedClient)
    }
  }
}
</script>

<style scoped>
p {
  font-size: 1em;
  text-align: center;
}
</style>
