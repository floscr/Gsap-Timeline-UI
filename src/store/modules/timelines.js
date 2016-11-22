import * as types from '../mutation-types'

const state = {
  active: {},
  all: [],
}

const mutations = {
  [types.ADD_TIMELINE] (state, timeline) {
    state.all.push(timeline)
  },
}

export default {
  state,
  mutations
}
