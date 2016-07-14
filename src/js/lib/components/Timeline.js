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

    // --------------
    // METHOD BINDING
    // --------------

    this.startScrubbing = this.startScrubbing.bind(this);
    this.stopScrubbing = this.stopScrubbing.bind(this);
    this.scrubTo = this.scrubTo.bind(this);

    this.changeMouseCursor = this.changeMouseCursor.bind(this);
    this.listenForKeyboardShortcuts = this.listenForKeyboardShortcuts.bind(this);

    this.startFollowCursor = this.startFollowCursor.bind(this);
    this.updateCursor = this.updateCursor.bind(this);

    this.startX = 0;
    this.currentX = 0;
    this.mouseIsOver = false;
    this.markers = {};

    this.createUi();
    this.addEventListeners();
  }

  createUi() {
    this.elements.timeline =
      this.elements.container.getElementsByClassName('gsapui--timeline')[0];
    this.elements.cursor =
      this.elements.container.getElementsByClassName('gsapui__timeline__track__cursor')[0];
    this.elements.track =
      this.elements.container.getElementsByClassName('gsapui__timeline__track')[0];
  }

  addEventListeners() {
    this.elements.timeline.addEventListener('mousedown', this.startScrubbing);
    this.elements.timeline.addEventListener('mouseover', this.startFollowCursor);

    // General Mouse Events
    this.elements.timeline.addEventListener('mouseout', () => { this.mouseIsOver = false; });
    this.elements.timeline.addEventListener('mouseover', () => { this.mouseIsOver = true; });
    this.elements.timeline.addEventListener('mousemove', evt => { this.currentX = evt.clientX; });

    // General Keyboard Events
    document.addEventListener('keydown', this.listenForKeyboardShortcuts);
  }


  listenForKeyboardShortcuts(evt) {
    switch(evt.keyCode) {
      case 81: this.addMarker(evt, 'start'); break; // Q
      case 87: this.addMarker(evt, 'stop'); break; // W
    }
  }

  addMarker(evt, kind) {
    if (this.mouseIsOver) {
      this.markers[kind] = this.currentX;
    }
    console.log(this.markers);
  }

  startFollowCursor(evt) {
    document.addEventListener('mousemove', this.updateCursor)

    this.elements.timeline.addEventListener('mouseout', () => {
      document.removeEventListener('mousemove', this.updateCursor);
      this.elements.timeline.removeEventListener('mouseout', this.followCursor);
    });
  }

  stopFollowCursor(evt) {
    this.elements.cursor.removeAttribute('style');
  }

  updateCursor(evt) {
    window.requestAnimationFrame(() => {
      this.elements.cursor.style['left'] = `${evt.clientX}px`;
    });
  }

  scrubTo(evt) {
    let parentPosition = returnElementOffset(this.elements.timeline);
    let xPosition = evt.clientX - parentPosition.x;
    // Disallow scrubbing over/under the window length
    if (xPosition < this.elements.timeline.offsetWidth && xPosition > 0) {
      tl.progress(xPosition / this.elements.timeline.offsetWidth);
      this.updateCursor(evt);
    }
  }

  stopScrubbing(evt) {
    document.body.removeEventListener('mouseup', this.stopScrubbing);
    document.removeEventListener('mousemove', this.scrubTo);
    this.elements.timeline.addEventListener('mousedown', this.startScrubbing);
    clearTimeout(this.cursorChangeTimeOut);

    this.stopFollowCursor();

    document.body.style.cursor = 'default';
    if (this.wasPlaying) {
      this.activeTimeline.play();
    }
  }

  changeMouseCursor() {
    document.body.style.cursor = 'ew-resize';
    clearTimeout(this.cursorChangeTimeOut);
  }

  startScrubbing(evt) {
    this.elements.timeline.removeEventListener('mousedown', this.startScrubbing);
    document.addEventListener('mouseup', this.stopScrubbing);
    document.addEventListener('mousemove', this.scrubTo);

    // Always show cursor when scrubbing
    this.elements.cursor.style['opacity'] = 1;

    // Change cursor only after short delay
    // So when we click to a position the cursor stays a pointer
    // Hooray UX!
    this.cursorChangeTimeOut = setTimeout(this.changeMouseCursor, 50);

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
