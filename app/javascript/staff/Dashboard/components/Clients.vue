<template lang="pug">
  #clients
    q-table(
      title="Clients",
      :data="clients",
      :columns="columns",
      selection="single",
      :selected.sync="selected_client"
      )
    q-btn-group(push)
      q-btn(push label="New" icon="add" v-on:click="addClient")
      q-btn(push v-if="selected_client.length" label="Edit" icon="edit")
      q-btn(push v-if="selected_client.length" label="Delete" icon="delete" v-on:click="deleteClient")

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
      selected_client: [],
      message: "Clients"
    }
  },

  methods: {
    deleteClient: function () {
      let client = this.selected_client[0];
      this.$emit ('deleteClient', client)
    },
    addClient: function () {
      this.$emit ('addClient')
    }
  },

  props: {
    clients: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
