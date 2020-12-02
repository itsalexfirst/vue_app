<template lang="pug">
  #equipments
    q-table(
      title="Equipments"
      :data="equipments"
      :columns="columns"
      row-key="title"
      selection="single"
      :selected.sync="selected")

    q-btn-group(push)
      q-btn(push label="New" icon="add" @click="addEquipment")
      q-btn(push v-if="selected.length" label="Edit" icon="edit" @click="updateEquipment")
      q-btn(push v-if="selected.length" label="Delete" icon="delete" @click="deleteEquipment")
    router-view(:organizations="organizations" @push-equipment="pushEquipment")

</template>

<script>
export default {
  name: 'Equipments',
  data: function () {
    return {
      columns: [
        { name: 'title', field: 'title', required: true, label: 'Title', align: 'left' },
        { name: 'category', field: 'category', required: true, label: 'Type', align: 'left' },
        { name: 'number', field: 'number', required: true, label: 'S/N', align: 'left' }
      ],
      selected: [],
      message: 'Equipments'
    }
  },
  computed: {
    equipments () {
      return this.$store.state.equipments
    },
    selectedEquipment: function () {
      return this.selected[0]
    }
  },

  mounted () {
    this.$store.dispatch('getEqipments')
  },

  methods: {
    deleteEquipment: function () {
      const equipment = this.selectedEquipment
      const index = this.equipments.findIndex(x => x.id === equipment.id)
      this.$api.equipments.delete(equipment)
        .then(() => {
          const equipments = this.equipments
          equipments.splice(index, 1)
          this.$store.commit('EQUIPMENT_TABLE', equipments)
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false))
    },
    addEquipment: function () {
      this.$router.push({ name: 'new_equipment' })
    },
    updateEquipment: function () {
      const id = this.selectedEquipment.id
      this.$router.push({ name: 'equipment', params: { id } })
    },
    pushEquipment: function (equipment) {
      const index = this.equipments.findIndex(x => x.id === equipment.id)
      const equipments = this.equipments
      if (index !== -1) {
        equipments.splice(index, 1, equipment)
      } else {
        equipments.push(equipment)
      }
      this.$store.commit('EQUIPMENT_TABLE', equipments)
    }
  },

  props: {
    organizations: {
      type: Array,
      requiried: true
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
