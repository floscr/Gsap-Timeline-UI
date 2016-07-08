import TweenMax from 'TweenMax';

class Timeline {

  constructor(containerEl) {
    this.progress = 0;
    this.element = undefined;
    this.elements = {
      container: containerEl,
    };
    this.createUi();
  }

  createUi() {
    this.elements.track =
      this.elements.container.getElementsByClassName('gsapui--timeline--track');
  }

  update() {
    TweenMax.set(this.elements.track, {
      scaleX: this.progress,
    });
  }

}

export default Timeline;
