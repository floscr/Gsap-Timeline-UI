import * as types from '../mutation-types'

import createPersist from 'vuex-localstorage'

const persist = createPersist('gsap-timeline', {
  isPlaying: true,
  progress: 0,
})

const state = {
  active: {
    ...persist.get(),
    gsap: undefined,
    duration: 0,
  },
  all: [],
}

const mutations = {

  [types.SET_ACTIVE_TIMELINE] (state, timeline) {
    state.active.gsap = timeline

    state.active.gsap.paused(!state.active.isPlaying)

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
    persist.set({ isPlaying: true })
  },

  [types.SKIP_BY] (state, skipBy) {
    const timeline = state.active.gsap
    const progress = timeline.progress()
    const skipAmount = timeline.duration() * skipBy
    timeline.progress(progress + skipAmount)
  },

  [types.REWIND] (state) {
    state.active.gsap.progress(0)
  },

  [types.PAUSE] (state) {
    state.active.gsap.paused(true)
    state.active.isPlaying = false
    persist.set({ isPlaying: false })
  },

  [types.SET_PROGRESS] (state, progress) {
    state.active.gsap.progress(progress)
  },

}

export default {
  state,
  mutations
}
