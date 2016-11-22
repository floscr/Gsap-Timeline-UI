import * as types from './mutation-types'

export const addTimeline = ({ commit }, timeline) => {
  commit(types.ADD_TIMELINE, timeline)
}
