// data-method="delete" won`t work without it
require("@rails/ujs").start()

import Vue from 'vue'
import App from 'Staff/Staff.vue'
import 'Staff/api'
import 'Staff/quasar'
import router from 'Staff/router'



document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  }).$mount()
})
