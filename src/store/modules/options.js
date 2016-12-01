import * as types from '../mutation-types'
import createPersist from 'vuex-localstorage'

const persist = createPersist('gsap', {
  restoreTimeline: false,
  skipBy: 0.01,
})

const state = {
  ...persist.get()
}

const mutations = {
  [types.SET_ENV]: (state, mutation) => {
    Object.assign(state, mutation)
    persist.set(state)
  }
}

export default {
  state,
  mutations
}
