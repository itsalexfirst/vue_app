<template lang="pug">
  #organizations
    q-table(
      title="Organizations"
      :data="organizations"
      :columns="columns"
      row-key="title"
      :filter="filter"
      selection="single"
      :selected.sync="selected")
      template(v-slot:top-right)
        q-input(v-model='filter' placeholder='Search')
          template(v-slot:append)
            q-icon(name='search')

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
        { name: 'title', field: 'title', required: true, label: 'Title', align: 'left', sortable: true },
        { name: 'category', field: 'category', required: true, label: 'Type', align: 'left', sortable: true },
        { name: 'inn', field: 'inn', required: true, label: 'INN', align: 'left', sortable: true },
        { name: 'ogrn', field: 'ogrn', required: true, label: 'OGRN', align: 'left', sortable: true }
      ],
      selected: [],
      filter: "",
      message: "Organizations"
    }
  },
  computed: {
    organizations() {
      return this.$store.state.organizations
    },
    selectedOrganization: function () {
      return this.selected[0]
    }
  },

  mounted() {
    this.$cable.subscribe({
      channel: 'OrganizationsChannel'
    });
    this.$store.dispatch('getOrganizations')
  },

  methods: {
    deleteOrganization: function () {
      let organization = this.selectedOrganization
      let index = this.organizations.findIndex(x => x.id === organization.id)
      this.$api.organizations.delete(organization)
      .then(() => {
        let organizations = this.organizations
        organizations.splice(index, 1)
        this.$store.commit('ORGANIZATION_TABLE', organizations)
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
      let organizations = this.organizations
      if (index !== -1) {
        //TODO q-table don't update edited row with (organizations[index] = organization) due https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
        organizations.splice(index, 1, organization)
      } else {
        organizations.push(organization)
      }
      this.$store.commit('ORGANIZATION_TABLE', organizations)
    },
  },

  channels: {
    OrganizationsChannel: {
      connected() {},
      rejected() {},
      received(data) {
        console.log(data.organization)
        this.pushOrganization(data.organization)
        //TODO https://github.com/itsalexfirst/vue_app/pull/5#discussion_r531571575
      },
      disconnected() {}
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
