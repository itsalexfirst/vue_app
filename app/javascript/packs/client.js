require("@rails/ujs").start()

import Vue from 'vue'
import App from '../client/Client.vue'
import '../client/api'
import '../client/quasar'



document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    render: h => h(App)
  }).$mount()
})
