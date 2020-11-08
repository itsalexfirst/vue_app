<template lang="pug">
  #navbar
    p {{ message }}
    img(src="/assets/logo.png" height="100")
    p User: {{ current_user.email }}
    a(rel="nofollow" data-method="delete" :href="logout_path") Log out
</template>

<script>
export default {
  name: 'Navbar',
  data: function () {
    return {
      message: "Navbar"
    }
  },
  props: {
    current_user: {
      type: Object,
      required: true
    },
    logout_path: {
      type: String,
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
