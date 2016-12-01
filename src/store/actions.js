import * as types from './mutation-types'

import Vue from 'vue'

/**
 * Set an option
 * @param {obj} options Options to update
 */
export const setOption = ({ commit, state }, options) => {
  commit(types.SET_ENV, options)
}

/**
 * Toggle the restore Timeline option
 */
export const toggleRestoreTimelineOption = ({ commit, state }) => {
  const restoreTimeline = !state.options.restoreTimeline
  commit(types.SET_ENV, { restoreTimeline })
}

/**
 * Add timeline to the store and set is active
 * @param {obj} timeline Gsap Timeline Object
 */
export const addTimeline = ({ commit, state, rootState }, timeline) => {
  commit(types.ADD_TIMELINE, timeline)
  commit(types.SET_ACTIVE_TIMELINE, {
    timeline,
    rootState
  })
}

/**
 * Toggle play/pause on the current timeline
 */
export const togglePlayPause = ({ commit, state }) => {
  if (state.timelines.active.gsap.paused() === true) {
    commit(types.PLAY)
  } else {
    commit(types.PAUSE)
  }
}

/**
 * Set the active timeline progress state
 * @param {int} progress Number from 0 - 1
 */
export const setTimelineProgress = ({ commit, state }, progress) => {
  commit(types.SET_PROGRESS, progress)
}

/**
 * Skip forward by the skipBy amount set in options state
 */
export const skipForward = ({ commit, state }) => {
  commit(types.SKIP_BY, state.options.skipBy)
}

/**
 * Skip backward by the skipBy amount set in options state
 */
export const rewind = ({ commit }) => {
  commit(types.REWIND)
}

/**
 * Skip backward by the skipBy amount set in options state
 */
export const skipBackward = ({ commit, state }) => {
  commit(types.SKIP_BY, -state.options.skipBy)
}
