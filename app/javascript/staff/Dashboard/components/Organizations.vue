<template lang="pug">
  #crganizations
    q-table(
      title="Organizations",
      :data="organizations",
      :columns="columns",
      selection="single",
      :selected.sync="selected_organization"
      )
    q-btn-group(push)
      q-btn(push label="New" icon="add" v-on:click="addOrganization")
      q-btn(push v-if="selected_organization.length" label="Edit" icon="edit")
      q-btn(push v-if="selected_organization.length" label="Delete" icon="delete" v-on:click="deleteOrganization")

</template>

<script>
export default {
  name: 'Organizations',
  data: function () {
    return {
      columns: [
        { name: 'title', field: 'title', required: true, label: 'Title', align: 'left' },
        { name: 'category', field: 'category', required: true, label: 'Type', align: 'left' },
        { name: 'inn', field: 'inn', required: true, label: 'INN', align: 'left' },
        { name: 'ogrn', field: 'ogrn', required: true, label: 'OGRN', align: 'left' }
      ],
      selected: [],
      selected_organization: [],
      message: "Organizations"
    }
  },

  methods: {
    deleteOrganization: function () {
      let organization = this.selected_organization[0];
      this.$emit ('deleteOrganization', organization)
    },
    addOrganization: function () {
      this.$emit ('addOrganization')
    }
  },

  props: {
    organizations: {
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
