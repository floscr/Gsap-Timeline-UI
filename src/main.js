import Vue from 'vue'

Vue.config.debug = true

// Vuex
import store from './store'

// Main App component
import App from './App.vue'

const GsapUi = new Vue({
  el: '#app',
  render: createElement => createElement(App),
  methods: {
    add (timeline) {
      console.log(timeline)
    },
  },
  store
})

// Public API
export function add () { GsapUi.add(...arguments) }
