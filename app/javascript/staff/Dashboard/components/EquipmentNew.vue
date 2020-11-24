<template lang="pug">
  q-dialog(
    v-model='showEquipmentDetails'
    persistent
    @hide="pushToEquipments")
    q-card
      q-bar.bg-primary.text-white
        span Create Equipment
      q-card-section
          #update-equipment
            #errors(v-if="errors.length")
              div(v-for="error in errors") {{ error }}
            .col-12
              q-input(v-model="equipment.title" placeholder="Title")
              q-input(v-model="equipment.category" placeholder="Type")
              q-input(v-model="equipment.number" placeholder="S/N")
      q-card-actions(align='right')
        q-btn(flat label='Save' color='primary' @click="saveEquipment")
        q-btn(flat label='Cancel' color='primary' v-close-popup)
  </template>

<script>
import loadingMixin from 'Staff/mixins/loaders'

  export default {
    name: 'Equipment',
    mixins: [loadingMixin],
    data: function () {
      return {
        showEquipmentDetails: true,
        equipment: {}
      }
    },

    computed: {
      id () {
        return this.$route.params.id
      }
    },

    methods : {
      saveEquipment () {
        this.$api.equipments.create(this.equipment)
        .then(({ data }) => {
          this.$emit('pushEquipment', data.equipment)
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false))
      },
      pushToEquipments () {
        this.$router.push({ name: 'equipments' })
      }
    }
  }
</script>
