import StorageController from './StorageController.js';

import BaseComponent from './BaseComponent.js';
import GUtils from '../utils/Gutils.js';

class Controller extends BaseComponent {

  init() {
    this.components = {};
    this.addEventListeners();
    this.store = new StorageController();
  }

  /*--------------------------------------------------------*\
   * Event Listeners
   *--------------------------------------------------------*/

  addEventListeners() {
    document.addEventListener('keydown', evt => this.listenForKeyboardShortcuts(evt));
  }

  listenForKeyboardShortcuts(evt) {
    switch(evt.keyCode) {
      case 32: this.togglePlayPause(); break; // Spacebar
      case 37: this.skipBackward(); break; // ←
      case 39: this.skipForward(); break; // →
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

  setPlayState(isPlaying) {
    this.components.buttonUi.setToPlay(!isPlaying);
    this.activeTimeline.paused(!isPlaying);
  }

  togglePlayPause() {
    let isPaused = GUtils.togglePlayPause(this.activeTimeline);
    this.components.buttonUi.setToPlay(isPaused);
    this.store.isPlaying = !isPaused;
  }

  /*--------------------------------------------------------*\
   * Local Storage
   *--------------------------------------------------------*/
}
export default Controller
