<template lang="pug">
  #clients
    q-table(
      title="Clients"
      :data="clients"
      :columns="columns"
      selection="single"
      :selected.sync="selected"
      )
    q-btn-group(push)
      q-btn(push label="New" icon="add" v-on:click="addClient")
      q-btn(push v-if="selected.length" label="Edit" icon="edit" v-on:click="updateClient")
      q-btn(push v-if="selected.length" label="Delete" icon="delete" v-on:click="deleteClient")
      q-btn(push v-if="selected.length" label="Add organization" icon="home" v-on:click="assignOrganization")
    p {{ selectedClient }}
    router-view

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
      message: "Clients"
    }
  },
  computed: {
    selectedClient: function () {
      return this.selected[0]
    }
  },

  methods: {
    deleteClient: function () {
      this.$emit ('deleteClient', this.selectedClient)
    },
    addClient: function () {
      this.$emit ('addClient')
    },
    updateClient: function () {
      let id = this.selectedClient.id
      this.$router.push({ name: 'client', params: { id }})
      //this.$emit ('updateClient', this.selectedClient)
    },
    assignOrganization: function () {
      this.$emit ('assignOrganization', this.selectedClient)
    },
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
  font-size: 1em;
  text-align: center;
}
</style>
