import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Dashboard from 'Staff/Dashboard/Dashboard'
import Clients from 'Staff/Dashboard/components/Clients'
import Client from 'Staff/Dashboard/components/Client'
import ClientNew from 'Staff/Dashboard/components/ClientNew'
import Organizations from 'Staff/Dashboard/components/Organizations'
import Organization from 'Staff/Dashboard/components/Organization'
import OrganizationNew from 'Staff/Dashboard/components/OrganizationNew'
import Equipments from 'Staff/Dashboard/components/Equipments'
import Equipment from 'Staff/Dashboard/components/Equipment'
import EquipmentNew from 'Staff/Dashboard/components/EquipmentNew'

const router = new VueRouter ({
  mode: 'history',
  routes : [
    { path: '/', redirect: '/clients' },
    { path: '/dashboard', component: Dashboard },
    { path: '/clients', component: Clients, name: 'clients', props: true,
      children: [
        { path: '/clients/:id', component: Client, name: 'client'},
        { path: '/clients/new', component: ClientNew, name: 'new_client'}
      ]
    },
    { path: '/organizations', component: Organizations, name: 'organizations', props: true,
      children: [
        { path: '/organizations/:id', component: Organization, name: 'organization'},
        { path: '/organizations/new', component: OrganizationNew, name: 'new_organization'}
      ]
    },
    { path: '/equipments', component: Equipments, name: 'equipments', props: true,
      children: [
        { path: '/equipments/:id', component: Equipment, name: 'equipment'},
        { path: '/equipments/new', component: EquipmentNew, name: 'new_equipment'}
      ]
    }
  ]
})

export default router
