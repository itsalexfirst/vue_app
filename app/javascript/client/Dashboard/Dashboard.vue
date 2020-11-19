<template lang="pug">
  #dashboard
    organizations(:organizations="organizations")
</template>

<script>
import Organizations from './components/Organizations.vue'

export default {
  name: 'Dashboard',
  data: function () {
    return {
      message: "Client Dashboard"
    }
  },

  props: {
    organizations: {
      type: Array,
      required: true
    }
  },

  components: {
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
