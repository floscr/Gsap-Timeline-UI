class ButtonUi {

  constructor(containerEl, activeTimeline) {
    this.elements = {
      container: containerEl,
    };
    this.timeline = activeTimeline;

    this.createUi();
  }

  createUi() {
    // Shorthand for the data attribute query selector
    var qs = function(attr) {
      return this.querySelector(`[data-action=${attr}]`);
    }.bind(this.elements.container);

    this.elements.forward = qs('forward');
    this.elements.backward = qs('backward');
    this.elements.togglePlay = qs('toggleplay');

    this.elements.togglePlay.addEventListener('mousedown', evt => {
      let isPaused = this.timeline.paused();
      this.timeline.paused(!isPaused);
      evt.target.innerHTML = isPaused ? 'pause' : 'play_arrow';
    })
  }


}
export default ButtonUi;
