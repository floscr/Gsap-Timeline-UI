import Store from './Store.js'

import round from 'lodash/math/round'

import BaseComponent from './BaseComponent.js'
import GUtils from '../utils/Gutils.js'

let lastTimeScale

class Controller extends BaseComponent {

  init () {
    this.components = {}
    this.addEventListeners()
    this.store = new Store()

    this._settings = {
      isSavingPosition: this.store.isSavingPosition || false,
    }

    this.settings = {
      isSavingPosition: this.store.isSavingPosition || false,
    }
  }

  get isSavingPosition () {
    return this._settings.isSavingPosition
  }

  set isSavingPosition (value) {
    this._settings.isSavingPosition = value
    this.store.isSavingPosition = value
  }

  addEventListeners () {
    document.addEventListener('keypress', evt => this.listenForKeyboardShortcuts(evt))
  }

  listenForKeyboardShortcuts (evt) {
    switch (evt.keyCode) {
      case 32: this.togglePlayPause() break // Spacebar

      case 37: this.skipBackward() break // ←
      case 39: this.skipForward() break // →

      case 82: this.setTimeScaleTo(1) break // r
      case 43: this.faster() break // +
      case 187: this.faster() break // =
      case 189: this.slower() break // →
      case 109: this.slower() break // →
    }
  }

  restoreTimelineState () {
    if (this.store.progress && this.isSavingPosition)
      this.activeTimeline.progress(this.store.progress)

    if (this.store.timeScale) this.setTimeScaleTo(this.store.timeScale)

    if (this.store.isPlaying !== undefined && this.isSavingPosition) {
      this.setPlayState(this.store.isPlaying)
    }
  }

  /*--------------------------------------------------------*\
   * Timeline Functions
   *--------------------------------------------------------*/

  skip (direction = 1) {
    let progress = this.timeline.progress()
    let duration = this.timeline.duration()
    let skipAmount = duration * this.config.skipBy * direction
    this.timeline.progress(progress + skipAmount)
  }

  skipForward () {
    this.skip()
  }

  skipBackward () {
    this.skip(-1)
  }

  setTimeScaleTo (amount) {
    this.activeTimeline.timeScale(amount)
    this.updateTimeScale(amount)
  }

  timeScale (amount) {
    let timeScale = round(this.activeTimeline.timeScale() + amount, 4)
    this.activeTimeline.timeScale(timeScale)
    this.updateTimeScale(timeScale)
  }

  updateTimeScale (timeScale) {
    this.components.buttonUi.updateTimeScale(timeScale)
    this.store.timeScale = timeScale
  }

  slower () {
    this.timeScale(-this.config.timeScaleAmount)
  }

  faster () {
    this.timeScale(this.config.timeScaleAmount)
  }

  setPlayState (isPlaying) {
    this.components.buttonUi.setToPlay(!isPlaying)
    this.activeTimeline.paused(!isPlaying)
  }

  togglePlayPause () {
    let isPaused = GUtils.togglePlayPause(this.activeTimeline)
    this.components.buttonUi.setToPlay(isPaused)
    this.store.isPlaying = !isPaused
  }

}
export default Controller
