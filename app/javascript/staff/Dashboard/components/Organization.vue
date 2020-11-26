<template lang="pug">
  q-dialog(
    v-model='showOrganizationDetails'
    persistent
    @hide="pushToOrganizations")
    q-card
      q-bar.bg-primary.text-white
        span Edit Organization
      q-card-section
          #update-organization
            #errors(v-if="errors.length")
              div(v-for="error in errors") {{ error }}
            .col-12
              q-input(v-model="organization.title" placeholder="Title")
              q-input(v-model="organization.category" placeholder="Type")
              q-input(v-model="organization.inn" placeholder="INN")
              q-input(v-model="organization.ogrn" placeholder="OGRN")
      q-card-actions(align='right')
        q-btn(flat label='Update' color='primary' @click="updateOrganization")
        q-btn(flat label='Cancel' color='primary' v-close-popup)
  </template>

<script>
import loadingMixin from 'Staff/mixins/loaders'

  export default {
    name: 'Organization',
    mixins: [loadingMixin],
    data: function () {
      return {
        showOrganizationDetails: true,
        organization: {}
      }
    },

    computed: {
      id () {
        return this.$route.params.id
      }
    },
    created () {
      this.$api.organizations.show(this.id)
        .then(({ data }) => {
            this.organization = data.organization
          })
          .catch(() => (this.error = true))
          .finally(() => (this.loading = false))
    },
    methods : {
      updateOrganization () {
        this.$api.organizations.update(this.organization)
        // .then(({ data }) => {
        //   this.$emit('pushOrganization', data.organization)
        // })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false))
      },
      pushToOrganizations () {
        this.$router.push({ name: 'organizations' })
      }
    }
  }
</script>
