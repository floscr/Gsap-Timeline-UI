import Vue from 'vue'

Vue.config.debug = true

// Vuex
import store from './store'
import { mapActions } from 'vuex'

// Main App component
import App from './App.vue'

const GsapUi = new Vue({
  el: '#app',
  render: createElement => createElement(App),
  methods: {
    ...mapActions({
      add: 'addTimeline',
    })
  },
  store
})

// Public API
export function add () { GsapUi.add(...arguments) }
