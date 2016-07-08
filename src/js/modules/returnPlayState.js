module.exports = function() {
  if (this.tl.paused()) {
    return 'play';
  } else {
    return 'pause'
  }
};
