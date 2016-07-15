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

    // Add mousedown listener to all buttons to trigger flash animation
    for(let prop in this.elements.buttons) {
      this.elements.buttons[prop].addEventListener('mousedown', () => { this.buttonFlash(); })
    }

    // Toggle Play Pause
    this.elements.buttons.togglePlay.addEventListener('mouseup', evt => {
      this.controller.togglePlayPause();
      this.togglePlayPause();
    });

    // Skip forward / backward
    this.elements.buttons.forward.addEventListener('mouseup', evt => {
      this.controller.skipForward();
    });
    this.elements.buttons.backward.addEventListener('mouseup', evt => {
      this.controller.skipBackward();
    });

  }

  buttonFlash() {
    console.log('Button Flash');
  }

  togglePlayPause() {
    this.elements.buttons.togglePlay.innerHTML = !this.timeline.paused() ? 'pause' : 'play_arrow';
  }

}
export default ButtonUi;
