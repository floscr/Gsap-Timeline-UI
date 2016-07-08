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
    this.changeCursor = this.changeCursor.bind(this);

    this.startX = 0;
    this.currentX = 0;

    this.createUi();
    this.addEventListeners();
  }

  createUi() {
    // TODO: Why does this need a [0] ?
    this.elements.timeline =
      this.elements.container.getElementsByClassName('gsapui--timeline')[0];
    this.elements.track =
      this.elements.container.getElementsByClassName('gsapui--timeline--track');
  }

  addEventListeners() {
    this.elements.timeline.addEventListener('mousedown', this.startScrubbing);
  }

  mouseLeavesWindow(evt) {
    let fromTarget = evt.relatedTarget || evt.toElement;
    if (!fromTarget || fromTarget.nodeName === 'HTML') {
      this.stopScrubbing();
      this.activeTimeline.pause();
    };
  }

  scrubTo(evt) {
    let parentPosition = returnElementOffset(evt.currentTarget);
    let xPosition = evt.clientX - parentPosition.x;
    tl.progress(xPosition / this.elements.timeline.offsetWidth);
  }

  stopScrubbing(evt) {
    document.body.removeEventListener('mouseup', this.stopScrubbing);
    document.body.removeEventListener('mousemove', this.scrubTo);
    this.elements.timeline.addEventListener('mousedown', this.startScrubbing);
    document.removeEventListener('mouseout', this.mouseLeavesWindow);
    clearTimeout(this.cursorChangeTimeOut);

    document.body.style.cursor = 'default';
    if (this.wasPlaying) {
      this.activeTimeline.play();
    }
  }

  changeCursor() {
    document.body.style.cursor = 'ew-resize';
    clearTimeout(this.cursorChangeTimeOut);
  }

  startScrubbing(evt) {
    this.elements.timeline.removeEventListener('mousedown', this.startScrubbing);
    document.body.addEventListener('mouseup', this.stopScrubbing);
    document.body.addEventListener('mousemove', this.scrubTo);
    document.addEventListener('mouseout', this.mouseLeavesWindow);

    // Change cursor only after short delay
    // So when we click to a position the cursor stays a pointer
    // Hooray UX!
    this.cursorChangeTimeOut = setTimeout(this.changeCursor, 50);

    // Pause timeline and save the playstate
    // so we can return to it later.
    this.wasPlaying = !this.activeTimeline.paused();
    this.activeTimeline.pause();

    this.scrubTo(evt);
  }

  update() {
    TweenMax.set(this.elements.track, {
      scaleX: this.progress,
    });
  }

}

export default Timeline;
