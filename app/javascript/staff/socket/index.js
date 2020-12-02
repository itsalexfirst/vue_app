import Vue from 'vue'
import ActionCable from 'actioncable'
import actionCablePlugin from './action-cable-plugin'

const cable = ActionCable.createConsumer()

Vue.use(actionCablePlugin, cable)
