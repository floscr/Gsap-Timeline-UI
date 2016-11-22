class Gutils {

  static togglePlayPause(timeline) {
    let willBePaused = !timeline.paused();
    timeline.paused(willBePaused);
    return willBePaused;
  }

}
export default Gutils
