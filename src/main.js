import Vue from 'vue'

Vue.config.debug = true

// Vuex
import store from './store'

// Components
import App from './App.vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: createElement => createElement(App),
  store
})
