class Cursor {

  constructor(el, className) {
    this.el = el;
    this.hiddenclassName = `${className}__hidden`;

    this.init();
  }

  init() {
    this.hide();
  }

  show() {
    this.el.classList.remove(this.hiddenclassName);
  }

  hide() {
    this.el.classList.add(this.hiddenclassName);
  }

  updatePosition(x) {
    TweenMax.set(this.el, {x: x});
  }

}

module.exports = Cursor;
