import * as types from '../mutation-types'

const state = {
  active: {
    reference: undefined,
    progress: 0,
    duration: 0,
  },
  all: [],
}

const mutations = {

  [types.SET_ACTIVE_TIMELINE] (state, timeline) {
    state.active.reference = timeline

    // Subscribe to Gsap timeline changes
    timeline.eventCallback('onUpdate', () => {
      state.active.progress = timeline.progress()
      state.active.duration = timeline.duration()
    })
  },

  [types.ADD_TIMELINE] (state, timeline) {
    state.all.push(timeline)
  },

  [types.PLAY] (state) {
    state.active.reference.paused(false)
  },

  [types.PAUSE] (state) {
    state.active.reference.paused(true)
  },

}

export default {
  state,
  mutations
}
