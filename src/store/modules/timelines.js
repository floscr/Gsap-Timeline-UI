import * as types from '../mutation-types'

const state = {
  active: {},
  all: [],
}

const mutations = {
  [types.SET_ACTIVE_TIMELINE] (state, timeline) {
    state.active = timeline
  },

  [types.ADD_TIMELINE] (state, timeline) {
    state.all.push(timeline)
  },
}

export default {
  state,
  mutations
}
