import TweenMax from 'TweenMax';
import returnElementOffset from '../utils/returnElementOffset.js';

class Timeline {

  constructor(containerEl, activeTimeline, isPlaying = true) {
    this.progress = 0;
    this.isPlaying = isPlaying;
    this.wasPlaying = isPlaying;
    this.activeTimeline = activeTimeline;
    this.elements = {
      container: containerEl,
    };

    this.startScrubbing = this.startScrubbing.bind(this);
    this.stopScrubbing = this.stopScrubbing.bind(this);
    this.scrubTo = this.scrubTo.bind(this);
    this.mouseLeavesWindow = this.mouseLeavesWindow.bind(this);

    this.startX = 0;
    this.currentX = 0;

    this.createUi();
    this.addEventListeners();
  }

  createUi() {
    this.elements.track =
      this.elements.container.getElementsByClassName('gsapui--timeline--track');
  }

  addEventListeners() {
    this.elements.container.addEventListener('mousedown', this.startScrubbing);
  }

  mouseLeavesWindow(evt) {
    let fromTarget = evt.relatedTarget || evt.toElement;
    if (!fromTarget || fromTarget.nodeName === 'HTML') {
      this.stopScrubbing();
      this.activeTimeline.pause();
    };
  }

  scrubTo(evt) {
    if (this.currentX !== evt.clientX) {
      let parentPosition = returnElementOffset(evt.currentTarget);
      let xPosition = evt.clientX - parentPosition.x;
      // cursor.updatePosition(xPosition);
      tl.progress(xPosition / this.elements.container.offsetWidth);
    };
    this.currentX = evt.clientX;
  }

  stopScrubbing(evt) {
    document.body.removeEventListener('mouseup', this.stopScrubbing);
    document.body.removeEventListener('mousemove', this.scrubTo);
    this.elements.container.addEventListener('mousedown', this.startScrubbing);
    document.removeEventListener('mouseout', this.mouseLeavesWindow);

    document.body.style.cursor = 'default';
    if (this.wasPlaying) {
      this.activeTimeline.play();
    }
  }

  startScrubbing(evt) {
    this.elements.container.removeEventListener('mousedown', this.startScrubbing);
    document.body.addEventListener('mouseup', this.stopScrubbing);
    document.body.addEventListener('mousemove', this.scrubTo);
    document.addEventListener('mouseout', this.mouseLeavesWindow);

    document.body.style.cursor = 'ew-resize';
    // $timeline.classList.add(timelineScrubbingClass);

    this.wasPlaying = !this.activeTimeline.paused();
    this.activeTimeline.pause();
  }


  update() {
    TweenMax.set(this.elements.track, {
      scaleX: this.progress,
    });
  }

}

export default Timeline;
