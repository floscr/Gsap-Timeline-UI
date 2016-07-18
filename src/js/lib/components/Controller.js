import Store from './Store.js';

import BaseComponent from './BaseComponent.js';
import GUtils from '../utils/Gutils.js';

let lastTimeScale;

class Controller extends BaseComponent {

  init() {
    this.components = {};
    this.addEventListeners();
    this.store = new Store();
  }

  /*--------------------------------------------------------*\
   * Event Listeners
   *--------------------------------------------------------*/

  addEventListeners() {
    document.addEventListener('keyup', evt => this.listenForKeyboardShortcuts(evt));
  }

  listenForKeyboardShortcuts(evt) {
    switch(evt.keyCode) {
      case 32: this.togglePlayPause(); break; // Spacebar

      case 37: this.skipBackward(); break; // ←
      case 39: this.skipForward(); break; // →

      case 82: this.setTimeScaleTo(1); break; // r
      case 43: this.faster(); break; // +
      case 187: this.faster(); break; // =
      case 189: this.slower(); break; // →
    }
  }

  restoreTimelineState() {
    if (this.store.progress) this.activeTimeline.progress(this.store.progress);

    if (this.store.isPlaying !== undefined) {
      this.setPlayState(this.store.isPlaying);
    }
  }

  /*--------------------------------------------------------*\
   * Timeline Functions
   *--------------------------------------------------------*/

  skip(direction = 1) {
    let progress = this.timeline.progress();
    let duration = this.timeline.duration();
    let skipAmount = duration * this.config.skipBy * direction;
    this.timeline.progress(progress + skipAmount);
  }

  skipForward() {
    this.skip();
  }

  skipBackward() {
    this.skip(-1);
  }

  setTimeScaleTo(amount) {
    this.activeTimeline.timeScale(amount);
    this.components.buttonUi.updateTimeScale(amount);
  }

  timeScale(amount) {
    let timeScale = this.activeTimeline.timeScale() + amount;
    this.activeTimeline.timeScale(timeScale);
    this.components.buttonUi.updateTimeScale(timeScale);
  }

  slower() {
    this.timeScale(-this.config.timeScaleAmount)
  }

  faster() {
    this.timeScale(this.config.timeScaleAmount)
  }

  setPlayState(isPlaying) {
    this.components.buttonUi.setToPlay(!isPlaying);
    this.activeTimeline.paused(!isPlaying);
  }

  togglePlayPause() {
    let isPaused = GUtils.togglePlayPause(this.activeTimeline);
    this.components.buttonUi.setToPlay(isPaused);
    this.store.isPlaying = !isPaused;
  }

}
export default Controller;