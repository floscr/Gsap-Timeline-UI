import Vue from 'vue'

Vue.config.debug = true

// Vuex
import store from './store'

// Components
import App from './App.vue'

class GsapUi {

  constructor () {
    this.vue = new Vue({
      el: '#app',
      render: createElement => createElement(App),
      methods: {
        hello () {
          console.log('Hello World')
        },
      },
      store
    })
    this.vue.hello()
  }

}

export default new GsapUi()
