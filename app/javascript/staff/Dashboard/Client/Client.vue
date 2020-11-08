<template lang="pug">
  div
    p {{ client.id }}
    p {{ client.fullname }}
    p {{ client.phone}}
    p {{ client.email}}

</template>

<script>
export default {
  name: 'Clients',
  data: function () {
    return {
      message: "Clients"
    }
  },

  props: {
    client: {
      type: Object,
      required: true
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
