import BaseComponent from './BaseComponent.js';

class ButtonUi extends BaseComponent {

  init() {
    this.createUi();
  }

  createUi() {
    // Shorthand for the data attribute query selector
    var qs = function(attr) {
      return this.querySelector(`[data-action=${attr}]`);
    }.bind(this.elements.container);

    this.elements.buttons = {};
    this.elements.buttons.forward = qs('forward');
    this.elements.buttons.backward = qs('backward');
    this.elements.buttons.togglePlay = qs('toggleplay');

    // Toggle Play Pause
    this.elements.buttons.togglePlay.addEventListener('mouseup', evt => {
      this.controller.togglePlayPause();
    });

    // Skip forward / backward
    this.elements.buttons.forward.addEventListener('mouseup', evt => {
      this.controller.skipForward();
    });
    this.elements.buttons.backward.addEventListener('mouseup', evt => {
      this.controller.skipBackward();
    });

  }

  setToPlay(isPlaying) {
    this.elements.buttons.togglePlay.innerHTML = isPlaying ? 'play_arrow' : 'pause';
  }

}
export default ButtonUi;
