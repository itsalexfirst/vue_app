<template lang="pug">
  #grid
    div {{ client.fullname }}
    div {{ client.phone}}
    div {{ client.email}}

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
#grid {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2vw;
  }
#grid > div {
  font-size: 2vw;
  padding: .1em;
  background: white;
  text-align: center;
}
</style>
