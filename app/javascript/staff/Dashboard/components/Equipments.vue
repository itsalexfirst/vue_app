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
      q-btn(push label="New" icon="add" v-on:click="addEquipment")
      q-btn(push v-if="selected.length" label="Edit" icon="edit" @click="updateEquipment")
      q-btn(push v-if="selected.length" label="Delete" icon="delete" v-on:click="deleteEquipment")
    router-view(:organizations="organizations" @pushEquipment="pushEquipment")

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
      message: "Equipments"
    }
  },
  computed: {
    selectedEquipment: function () {
      return this.selected[0]
    }
  },

  methods: {
    deleteEquipment: function () {
      let equipment = this.selectedEquipment
      let index = this.equipments.findIndex(x => x.id === equipment.id)
      this.$api.equipments.delete(equipment)
      .then(() => {
        this.equipments.splice(index, 1)
      })
      .catch(() => (this.error = true))
      .finally(() => (this.loading = false))
    },
    addEquipment: function () {
      this.$router.push({ name: 'new_equipment' })
    },
    updateEquipment: function () {
      let id = this.selectedEquipment.id
      this.$router.push({ name: 'equipment', params: { id }})
    },
    pushEquipment: function (equipment) {
      let index = this.equipments.findIndex(x => x.id === equipment.id)
      if (index !== -1) {
        this.equipments[index] = equipment
      } else {
        this.equipments.push(equipment)
      }
    },
  },

  props: {
    equipments: {
      type: Array,
      required: true
    },
    organizations: {
      type: Array,
      requiried: true
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
