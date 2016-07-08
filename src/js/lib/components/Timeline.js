import TweenMax from 'TweenMax';

class Timeline {

  constructor() {
    this.progress = 0;
    this.element = undefined;
  }

  update() {
    TweenMax.set(this.element, {
      scaleX: this.progress,
    });
  }

}

export default Timeline;
