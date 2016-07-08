
module.exports = function addUi() {

  let elements = {};
  let gsapUiClassName = this.className;

  // Timeline: Container
  // Track: Animated Bar
  // Dragger: At the end of the timeline
  // Cursor: On mouse hover matching mouse position
  ['timeline', 'track', 'dragger', 'cursor', 'totalTime'].forEach(function(x) {
    elements[x] = document.createElement('div');
    elements[x].className = `${gsapUiClassName}--${x}`;
  });
  let $timeline = elements.timeline;
  $timeline.appendChild(elements.totalTime);
  $timeline.appendChild(elements.track);
  $timeline.appendChild(elements.dragger);
  $timeline.appendChild(elements.cursor);

  return elements;

};
