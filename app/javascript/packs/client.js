require("@rails/ujs").start()

import Vue from 'vue'
import App from 'Client/Client.vue'
import 'Client/api'
import 'Client/quasar'



document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    render: h => h(App)
  }).$mount()
})
