<template lang="pug">
  #clients
    q-table(
      title="Clients",
      :data="clients",
      :columns="columns",
      selection="single",
      :selected.sync="selected"
      )
    q-btn-group(push)
      q-btn(push label="New" icon="add")
      q-btn(push v-if="selected.length" label="Edit" icon="edit")
      q-btn(push v-if="selected.length" label="Delete" icon="delete" v-on:click="deleteClient")

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

  methods: {
    deleteClient: function () {
      let client = this.selected[0];

      this.$emit ('deleteClient', {
          id: client.id
        })
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
#grid {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2vw;
  }
#grid > div {
  font-size: 2vw;
  padding: .1em;
  background: white;
  text-align: center;
}
</style>
