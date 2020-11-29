import Vue from 'vue'
import ActionCable from 'actioncable'

const cable = ActionCable.createConsumer()
import actionCablePlugin from './action-cable-plugin'

Vue.use(actionCablePlugin, cable)
