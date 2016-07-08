import TweenMax from 'TweenMax';

class Timeline {

  constructor(containerEl, activeTimeline) {
    this.progress = 0;
    this.activeTimeline = activeTimeline;
    this.elements = {
      container: containerEl,
    };

    this.startScrubbing = this.startScrubbing.bind(this);

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

  startScrubbing(evt) {
    // $timeline.classList.add(timelineScrubbingClass);
    // this.elements.container.removeEventListener('mousedown', e => this.startScrubbing(e), false);
    console.log('Pause');
    this.elements.container.removeEventListener('mousedown', this.startScrubbing);
    // this.elements.addEventListener('mouseup', stopScrubbing, false);
    document.body.style.cursor = 'ew-resize';
    // wasPlaying = !tl.paused();

    this.activeTimeline.pause();
    // mouseIsDown = true;
    // mouseMove(e);

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
