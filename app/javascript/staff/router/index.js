import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Dashboard from 'Staff/Dashboard/Dashboard'
import Clients from 'Staff/Dashboard/components/Clients'
import Client from 'Staff/Dashboard/components/Client'
import Organizations from 'Staff/Dashboard/components/Organizations'

const router = new VueRouter ({
  mode: 'history',
  routes : [
    { path: '/', redirect: '/clients' },
    { path: '/dashboard', component: Dashboard },
    { path: '/clients', component: Clients, name: 'clients', props: true,
      children: [
        { path: '/clients/:id', component: Client, name: 'client'}
      ]
    },
    { path: '/organizations', component: Organizations, name: 'organizations', props: true }
  ]
})

export default router
