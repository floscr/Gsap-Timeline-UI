var u = require('../../utils/Utils');
var config = require('../../utils/config');

let returnElementOffset = require('../returnElementOffset');
var Cursor = require('./Cursor');

class Timeline {

  constructor(tl) {
    this.tl = tl;
    this.className = config.className;
    this.width = 0;

    this.addUi = require('./Timeline.addUi');

    this.init();
  }

  init() {
    this.ui = this.addUi();
    this.updateTimeIndicator();
    this.cursor = new Cursor(this.ui.cursor, this.className);
    this.addListeners();
  }

  updateTimeIndicator(timeScale = this.tl.timeScale()) {
    if (timeScale < 0) {
      timeScale = -timeScale;
    };
    let duration = this.tl.duration() / timeScale;
    this.ui.totalTime.textContent = `${u.zeroPad(duration)} sec`;
  }

  addListeners() {

    let timer,
        parentPosition,
        xPosition,
        yPosition,
        cachedClientX,
        wasPlaying,
        mouseIsDown,
        timelineWidth = 0;

    let $timeline = this.ui.timeline,
        cursor = this.cursor,
        tl = this.tl;

    let timelineHoverClass = `${$timeline.classList}__hover`,
        timelineScrubbingClass = `${$timeline.classList}__active`;

    function mouseMove(e) {

      // Only update when the mouseX changes
      if (mouseIsDown || cachedClientX !== e.clientX) {
        parentPosition = returnElementOffset(e.currentTarget);
        xPosition = e.clientX - parentPosition.x;
        cursor.updatePosition(xPosition);
        if (mouseIsDown) {
          tl.progress(xPosition / timelineWidth);
        };
      };
      cachedClientX = e.clientX;
    }

    function stopScrubbing(e) {
      $timeline.classList.remove(timelineScrubbingClass);
      $timeline.addEventListener('mousedown', startScrubbing, false);
      document.body.style.removeProperty('cursor');
      // document.body.style.cursor = 'inherit';
      mouseIsDown = false;
      if (wasPlaying) {
        tl.play();
      };
    }

    function startScrubbing(e) {
      $timeline.classList.add(timelineScrubbingClass);
      $timeline.removeEventListener('mousedown');
      $timeline.addEventListener('mouseup', stopScrubbing, false);
      document.body.style.cursor = 'ew-resize';
      wasPlaying = !tl.paused();
      tl.pause();
      mouseIsDown = true;
      mouseMove(e);

      // Stop scrubbing when the mouse leaves the window
      document.addEventListener('mouseout', function(e) {
        var fromTarget = e.relatedTarget || e.toElement;
        if (!fromTarget || fromTarget.nodeName === 'HTML') {
          $timeline.removeEventListener('mouseup');
          e.target.removeEventListener('mouseout');
          stopScrubbing();
          tl.pause();
        };
      }, false)

    }

    $timeline.addEventListener('mousedown', startScrubbing, false);

    // Deferred hover
    $timeline.addEventListener('mouseover', function(e) {
      timelineWidth = $timeline.offsetWidth;
      $timeline.addEventListener('mousemove', (e)=> mouseMove(e), false);
      cursor.show();
      timer = window.setTimeout(
        $timeline.classList.add(timelineHoverClass)
      , 180);
    })

    $timeline.addEventListener('mouseout', function(e) {
      cursor.hide();
      $timeline.removeEventListener('mousemove');
      $timeline.classList.remove(timelineHoverClass);
      window.clearTimeout(timer);
    });

  }

}

module.exports = Timeline;

