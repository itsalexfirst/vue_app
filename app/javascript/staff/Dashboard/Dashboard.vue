<template lang="pug">
  #dashboard
    router-view(:clients="clients"
                 @deleteClient="deleteClient"
                 @addClient="confirmAddClient = true"
                 @updateClient="updateClient"
                 @assignOrganization="assignOrganization"

                 :organizations="organizations"
                 @deleteOrganization="deleteOrganization"
                 @addOrganization="confirmAddOrganization = true"
                 @updateOrganization="updateOrganization")


    q-dialog(v-model='confirmAddClient' persistent)
      q-card
        q-card-section.row.items-center
          span.q-ml-sm Add Client
          #new-client
            #errors(v-if="errors.length")
              div(v-for="error in errors") {{ error }}
            form(v-on:submit.prevent="onSubmitClient")
              input(v-model="fullname" placeholder="full name")
              input(v-model="phone" placeholder="phone")
              input(v-model="email" placeholder="email")
              button Submit
        q-card-actions(align='right')
          q-btn(flat label='Cancel' color='primary' v-close-popup)

    q-dialog(v-model='confirmUpdateClient' persistent)
      q-card
        q-card-section.row.items-center
          span.q-ml-sm Edit Client
          #update-client
            #errors(v-if="errors.length")
              div(v-for="error in errors") {{ error }}
            form(v-on:submit.prevent="onSaveClient")
              input(v-model="editedClient.fullname" placeholder="full name")
              input(v-model="editedClient.phone" placeholder="phone")
              input(v-model="editedClient.email" placeholder="email")
              button Submit
        q-card-actions(align='right')
          q-btn(flat label='Cancel' color='primary' v-close-popup)

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

    q-dialog(v-model='confirmAddOrganization', persistent)
      q-card
        q-card-section.row.items-center
          span.q-ml-sm Add Organization
          #new-organization
            #errors(v-if="errors.length")
              div(v-for="error in errors") {{ error }}
            form(v-on:submit.prevent="onSubmitOrganization")
              input(v-model="title" placeholder="Title")
              input(v-model="category" placeholder="Type")
              input(v-model="inn" placeholder="INN")
              input(v-model="ogrn" placeholder="OGRN")
              button Submit
        q-card-actions(align='right')
          q-btn(flat label='Cancel' color='primary' v-close-popup)

    q-dialog(v-model='confirmUpdateOrganization' persistent)
      q-card
        q-card-section.row.items-center
          span.q-ml-sm Edit Client
          #update-client
            #errors(v-if="errors.length")
              div(v-for="error in errors") {{ error }}
            form(v-on:submit.prevent="onSaveOrganization")
              input(v-model="editedOrganization.title" placeholder="Title")
              input(v-model="editedOrganization.category" placeholder="Type")
              input(v-model="editedOrganization.inn" placeholder="INN")
              input(v-model="editedOrganization.ogrn" placeholder="OGRN")
              button Submit
        q-card-actions(align='right')
          q-btn(flat label='Cancel' color='primary' v-close-popup)
</template>

<script>
import Clients from './components/Clients.vue'
import Organizations from './components/Organizations.vue'

export default {
  name: 'Dashboard',
  data: function () {
    return {
      message: "Dashboard",
      errors:[],
      editedIndex: -1,

      confirmAddClient: false,
      fullname: "",
      phone: "",
      email: "",

      confirmUpdateClient: false,
      editedClient: {
        fullname: "",
        phone: "",
        email: ""
      },

      confirmAssignOrganization: false,
      assignedOrganization: null,

      confirmAddOrganization: false,
      title: "",
      category: "",
      inn: "",
      ogrn: "",

      confirmUpdateOrganization: false,
      editedOrganization: {
        title: "",
        inn: "",
        ogrn: "",
        category: ""
      }
    }
  },
  methods: {
    onSubmitClient: function () {
      this.errors = [];
      if (!this.fullname.match(/\w{5,}/)) {
        this.errors.push("Enter name")
      }
      if (!this.phone.match(/\d+/)) {
        this.errors.push("Enter phone")
      }
      if (!this.email.match(/^\S+@\S+\.\S+$/)) {
        this.errors.push("invalid email")
      }
      if (!this.errors.length) {
         this.$emit ('createClient', {
          fullname: this.fullname,
          phone: this.phone,
          email: this.email
        })
      }
    },
    onSubmitOrganization: function () {
      this.errors = [];
      if (!this.title.match(/\w{5,}/)) {
        this.errors.push("Enter title")
      }
      if (!this.inn.match(/\d+/)) {
        this.errors.push("Enter INN")
      }
      if (!this.ogrn.match(/\d+/)) {
        this.errors.push("Enter OGRN")
      }
      if (!this.category.match(/\w{2,}/)) {
        this.errors.push("Enter type")
      }
      if (!this.errors.length) {
         this.$emit ('createOrganization', {
          title: this.title,
          category: this.category,
          inn: this.inn,
          ogrn: this.ogrn
        })
      }
    },
    deleteClient (client) {
      this.$api.clients.delete(client)
      .then(() => {
        let index = this.clients.findIndex(x => x.id === client.id)
        this.clients.splice(index, 1)
      })
      .catch(() => (this.error = true))
      .finally(() => (this.loading = false))
    },
    updateClient (client) {
      this.editedIndex =this.clients.findIndex(x => x.id === client.id)
      this.editedClient = Object.assign({}, client)
      this.confirmUpdateClient = true
    },
    onSaveClient () {
      let client = Object.assign({}, this.editedClient)
      this.$api.clients.update(client)
      .then(({ data }) => {
        this.clients.splice(this.editedIndex, 1)
        this.clients.push(data)
      })
      .catch(() => (this.error = true))
      .finally(() => (this.loading = false))
    },
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
    deleteOrganization (organization) {
      this.$api.organizations.delete(organization)
      .then(() => {
        let index = this.organizations.findIndex(x => x.id === organization.id)
        this.organizations.splice(index, 1)
      })
      .catch(() => (this.error = true))
      .finally(() => (this.loading = false))
    },
    updateOrganization (organization) {
      this.editedIndex = this.organizations.findIndex(x => x.id === organization.id)
      this.editedOrganization = Object.assign({}, organization)
      this.confirmUpdateOrganization = true
    },
    onSaveOrganization () {
      let organization = Object.assign({}, this.editedOrganization)
      this.$api.organizations.update(organization)
      .then(({ data }) => {
        this.organizations.splice(this.editedIndex, 1)
        this.organizations.push(data)
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
  },

  components: {
    Clients,
    Organizations
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
