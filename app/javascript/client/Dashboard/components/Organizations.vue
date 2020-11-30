<template lang="pug">
  #organizations
    q-table(
      title="Organizations"
      :data="organizations"
      :columns="columns"
      )
</template>

<script>
export default {
  name: 'ClientOrganizations',
  data: function () {
    return {
      columns: [
        { name: 'title', field: 'title', required: true, label: 'Title', align: 'left' },
        { name: 'category', field: 'category', required: true, label: 'Type', align: 'left' },
        { name: 'inn', field: 'inn', required: true, label: 'INN', align: 'left' },
        { name: 'ogrn', field: 'ogrn', required: true, label: 'OGRN', align: 'left' }
      ],
      message: 'Client Organizations'
    }
  },

  props: {
    organizations: {
      type: Array,
      required: true
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
