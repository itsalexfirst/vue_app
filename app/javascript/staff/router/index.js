import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Dashboard from 'Staff/Dashboard/Dashboard'
import Clients from 'Staff/Dashboard/components/Clients'
import Organizations from 'Staff/Dashboard/components/Organizations'

const router = new VueRouter ({
  mode: 'history',
  routes : [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', component: Dashboard },
    { path: '/clients', component: Clients, name: 'clients', props: true },
    { path: '/organizations', component: Organizations, name: 'organizations', props: true }
  ]
})

export default router
