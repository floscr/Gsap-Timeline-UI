import * as types from '../mutation-types'

const state = {
  active: {
    gsap: undefined,
    isPlaying: true,
    progress: 0,
    duration: 0,
  },
  all: [],
}

const mutations = {

  [types.SET_ACTIVE_TIMELINE] (state, timeline) {
    state.active.gsap = timeline

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
    state.active.gsap.paused(false)
    state.active.isPlaying = true
  },

  [types.PAUSE] (state) {
    state.active.gsap.paused(true)
    state.active.isPlaying = false
  },

  [types.SET_PROGRESS] (state, progress) {
    state.active.gsap.progress(progress)
  },

}

export default {
  state,
  mutations
}
