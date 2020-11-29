// data-method="delete" won`t work without it
require("@rails/ujs").start()

import Vue from 'vue'
import ActionCableVue from 'actioncable-vue'

import router from 'Staff/router'
import store from 'Staff/store'

import App from 'Staff/Staff.vue'
import 'Staff/api'
import 'Staff/quasar'

Vue.use(ActionCableVue, {
  connectImmediately: true
})

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  }).$mount()
})
