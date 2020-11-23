<template lang="pug">
  #dashboard
    router-view(:clients="clients"
                :organizations="organizations"
                :equipments="equipments"
                @assignOrganization="assignOrganization")

    q-dialog(v-model='confirmAssignOrganization', persistent)
      q-card
        q-card-section.row.items-center
          span.q-ml-sm Assign Organization
          #assign-organization
            #errors(v-if="errors.length")
              div(v-for="error in errors") {{ error }}
            form(v-on:submit.prevent="onAssignOrganization")
              q-select(v-model="assignedOrganization" :options="organizations" option-label="title")
              button Submit
        q-card-actions(align='right')
          q-btn(flat, label='Cancel' color='primary' v-close-popup)
</template>

<script>
import Clients from './components/Clients.vue'
import Organizations from './components/Organizations.vue'
import Equipments from './components/Equipments.vue'

export default {
  name: 'Dashboard',
  data: function () {
    return {
      message: "Dashboard",
      errors:[],
      editedIndex: -1,

      confirmAssignOrganization: false,
      assignedOrganization: null
    }
  },
  methods: {
    assignOrganization (client) {
      this.editedIndex =this.clients.findIndex(x => x.id === client.id)
      this.editedClient = Object.assign({}, client)
      this.confirmAssignOrganization = true
    },
    onAssignOrganization () {
      let client = Object.assign({}, this.editedClient)
      let organization = this.assignedOrganization
      this.$api.clients.add_organization(client, organization)
      .then(({ data }) => {
        this.clients.push(organization)
      })
      .catch(() => (this.error = true))
      .finally(() => (this.loading = false))
    },
  },

  props: {
    clients: {
      type: Array,
      required: true
    },
    organizations: {
      type: Array,
      required: true
    }
    ,
    equipments: {
      type: Array,
      required: true
    }
  },

  components: {
    Clients,
    Organizations,
    Equipments
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
