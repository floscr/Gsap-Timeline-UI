import BaseComponent from './BaseComponent.js';
import GUtils from '../utils/Gutils.js';

class Controller extends BaseComponent {

  init() {
    this.components = {};
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener('keydown', evt => this.listenForKeyboardShortcuts(evt));
  }

  listenForKeyboardShortcuts(evt) {
    switch(evt.keyCode) {
      case 32: this.togglePlayPause(); break; // Spacebar
      // case 37: this.togglePlayPause(); break; // ←
      // case 39: this.togglePlayPause(); break; // →
    }
  }

  togglePlayPause() {
    GUtils.togglePlayPause(this.activeTimeline);
    this.components.buttonUi.togglePlayPause();
  }

}
export default Controller
