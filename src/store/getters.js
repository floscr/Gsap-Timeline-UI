import round from 'lodash/round'
import isEmpty from 'lodash/isEmpty'

import Vue from 'vue'

export const activeTimeline = state => state.timelines.active

export const duration = state => state.timelines.active.duration

export const progress = state => {
  return state.timelines.active.progress
}

export const niceProgress = state => round(state.timelines.active.progress, 2)
