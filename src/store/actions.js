import * as types from './mutation-types'

import isEmpty from 'lodash/isEmpty'

export const addTimeline = ({ commit, state }, timeline) => {
  commit(types.ADD_TIMELINE, timeline)
  if (isEmpty(state.active)) commit(types.SET_ACTIVE_TIMELINE, timeline)
}
