<template lang="pug">
  #dashboard
    router-view(:clients="clients"
                :organizations="organizations"
                :equipments="equipments"
                @assign-organization="assignOrganization")

    q-dialog(v-model="confirmAssignOrganization", persistent)
      q-card
        q-bar.bg-primary.text-white
          span Assign Organization
        q-card-section
          #assign-organization
            #errors(v-if="errors.length")
              div(v-for="error in errors") {{ error }}
            .col-12
              q-select(v-model="assignedOrganization" :options="organizations" option-label="title")
        q-card-actions(align="right")
          q-btn(flat label="Assign" color="primary" @click="onAssignOrganization")
          q-btn(flat label="Cancel" color="primary" v-close-popup)
</template>

<script>
import Clients from './components/Clients.vue'
import Organizations from './components/Organizations.vue'
import Equipments from './components/Equipments.vue'

export default {
  name: 'Dashboard',
  data: function () {
    return {
      message: 'Dashboard',
      errors: [],
      editedIndex: -1,

      confirmAssignOrganization: false,
      assignedOrganization: null
    }
  },

  methods: {
    assignOrganization (client) {
      this.editedIndex = this.clients.findIndex(x => x.id === client.id)
      this.editedClient = Object.assign({}, client)
      console.log(client)
      this.confirmAssignOrganization = true
    },
    onAssignOrganization () {
      const client = Object.assign({}, this.editedClient)
      const organization = this.assignedOrganization
      this.$api.clients.add_organization(client, organization)
        // .then(({ data }) => {
        //   this.clients.push(data.client)
        // })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false))
    }
  },

  props: {
    clients: {
      type: Array,
      required: true
    },
    organizations: {
      type: Array,
      required: true
    },
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
