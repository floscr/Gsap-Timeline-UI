import TweenMax from 'TweenMax';

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

  scrubTo(evt) {

  }

  stopScrubbing(evt) {
    document.body.removeEventListener('mouseup', this.stopScrubbing);
    document.body.removeEventListener('mousemove', this.scrubTo);
    this.elements.container.addEventListener('mousedown', this.startScrubbing);

    document.body.style.cursor = 'default';
    if (this.wasPlaying) {
      this.activeTimeline.play();
    }
  }

  startScrubbing(evt) {
    this.elements.container.removeEventListener('mousedown', this.startScrubbing);
    document.body.addEventListener('mouseup', this.stopScrubbing);
    document.body.addEventListener('mousemove', this.scrubTo);

    document.body.style.cursor = 'ew-resize';
    // $timeline.classList.add(timelineScrubbingClass);

    this.wasPlaying = !this.activeTimeline.paused();
    this.activeTimeline.pause();

    // // Stop scrubbing when the mouse leaves the window
    // document.addEventListener('mouseout', function(e) {
    //   var fromTarget = e.relatedTarget || e.toElement;
    //   if (!fromTarget || fromTarget.nodeName === 'HTML') {
    //     $timeline.removeEventListener('mouseup');
    //     e.target.removeEventListener('mouseout');
    //     stopScrubbing();
    //     tl.pause();
    //   };
    // }, false)

  }


  update() {
    TweenMax.set(this.elements.track, {
      scaleX: this.progress,
    });
  }

}

export default Timeline;
