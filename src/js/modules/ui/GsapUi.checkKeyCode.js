/**
 * Execute a function for specific keystrokes
 * VALUES:
 */
module.exports = function checkKeyCode(e) {
  var code = e.keyCode;
  switch (code) {
    case 32: this.togglePlayState(); break; // Spacebar
    case 39: this.skipBy(); break; // ->
    case 37: this.skipBy(-1); break; // <-
    case 72: this.ui.style.visibility = (this.ui.style.visibility === 'hidden') ? 'visible' : 'hidden'; break; // h
  }
}
