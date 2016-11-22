import * as types from './mutation-types'

import Vue from 'vue'

export const addTimeline = ({ commit, state }, timeline) => {
  commit(types.ADD_TIMELINE, timeline)
  commit(types.SET_ACTIVE_TIMELINE, timeline)
}
