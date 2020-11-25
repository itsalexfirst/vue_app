<template lang="pug">
  #organizations
    q-table(
      title="Organizations"
      :data="organizations"
      :columns="columns"
      row-key="title"
      selection="single"
      :selected.sync="selected")

    q-btn-group(push)
      q-btn(push label="New" icon="add" v-on:click="addOrganization")
      q-btn(push v-if="selected.length" label="Edit" icon="edit" @click="updateOrganization")
      q-btn(push v-if="selected.length" label="Delete" icon="delete" v-on:click="deleteOrganization")
    router-view(@pushOrganization="pushOrganization")

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
      message: "Organizations"
    }
  },
  computed: {
    selectedOrganization: function () {
      return this.selected[0]
    }
  },

  methods: {
    deleteOrganization: function () {
      let organization = this.selectedOrganization
      let index = this.organizations.findIndex(x => x.id === organization.id)
      this.$api.organizations.delete(organization)
      .then(() => {
        this.organizations.splice(index, 1)
      })
      .catch(() => (this.error = true))
      .finally(() => (this.loading = false))
    },
    addOrganization: function () {
      this.$router.push({ name: 'new_organization' })
    },
    updateOrganization: function () {
      let id = this.selectedOrganization.id
      this.$router.push({ name: 'organization', params: { id }})
    },
    pushOrganization: function (organization) {
      let index = this.organizations.findIndex(x => x.id === organization.id)
      if (index !== -1) {
        this.organizations[index] = organization
      } else {
        this.organizations.push(organization)
      }
    },
  },

  props: {
    organizations: {
      type: Array,
      required: true
    }
  },

  subscriptions: {
    OrganizationsChannel: {
      received: (data) => {
        console.log(data)
      }
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
