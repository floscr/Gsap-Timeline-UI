var Button = require('./Button');
var Timeline = require('./Timeline');
var u = require('../../utils/Utils');

module.exports = function addUiElements() {

  let elements = {
    buttons: {}
  };

  this.ui = document.createElement('div');
  this.ui.className = this.className;
  this.ui.draggable = false;
  this.ui.ondragstart = function() { return false; };

  // --------------------------
  // Timeline
  // --------------------------

  this.timeline = new Timeline(this.tl, this.className);
  elements.timeline = this.timeline.ui.timeline;

  // --------------------------
  // Buttons
  // --------------------------

  elements.buttonList = u.createElement('buttonList');

  // Play / Pause
  elements.buttons.playPause = new Button({
    handler: ()=> this.togglePlayState(),
    classNames: (this.isPlaying) ? ['icon-left', 'icon-pause'] : ['icon-left', 'icon-play']
  });

  elements.buttons.skipBackward = new Button({
    handler: ()=> this.skipBy(-1),
    classNames: ['icon-left', 'icon-skipBackward']
  });

  elements.buttons.skipForward = new Button({
    handler: ()=> this.skipBy(1),
    classNames: ['icon-left', 'icon-skipForward']
  });

  for (let index in elements.buttons) {
    elements.buttonList.appendChild(elements.buttons[index]);
  }

  // -----------
  // Speed Input
  // -----------

  let speedInputWrapper = u.createElement('speedInput')

  let speedInput = document.createElement('input');
  speedInput.type = 'text';
  speedInput.name = u.prefixClass('speedInput');
  speedInput.value = this.tl.timeScale();

  let slowerSpeedBtn = new Button({
    handler: ()=> this.changeSpeed(-0.2, speedInput),
    classNames: ['icon-left', 'icon-minus']
  });

  let fasterSpeedBtn = new Button({
    handler: ()=> this.changeSpeed(0.2, speedInput),
    classNames: ['icon-left', 'icon-plus']
  });


  elements.speedInput = u.appendChildrenTo(speedInputWrapper, [
    slowerSpeedBtn,
    speedInput,
    fasterSpeedBtn
  ]);

  elements.speedInput.input = speedInput;

  elements.buttonList.appendChild(elements.speedInput);

  // --------------------------
  // Render
  // --------------------------

  this.ui = u.appendChildrenTo(this.ui, [
    elements.timeline,
    elements.buttonList,
  ])
  document.body.appendChild(this.ui);

  return elements;

}
