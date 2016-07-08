var _ = {
  padLeft: require('lodash/string/padLeft'),
  round: require('lodash/math/round'),
  flatten: require('lodash/array/flatten'),
};
var config = require('./config');

class Utils {

  /**
   * Return an element with the prefixed className
   * @param  {string} className optional
   * @param  {string} type      dom element type (default: div)
   * @return {dom}
   */
  createElement(className, type = 'div') {
    let element = document.createElement(type);
    if (className) {
      element.classList.add(this.prefixClass(className));
    };
    return element;
  }

  appendChildrenTo() {
    let target = arguments[0];
    let nodes = _.flatten(arguments);
    nodes.shift();
    nodes.forEach(function(elem) {
      target.appendChild(elem);
    });
    return target;
  }

  /**
   * Return a prefixed string class name using BEM --
   * @param  {string} className className
   * @param  {string} prefix    gsap-ui
   * @return {string}           gsap-ui--className
   */
  prefixClass(className, prefix = config.className) {
    return `${prefix}--${className}`;
  }

  /**
   * Return a 0 padded floating point rounded to 2 digits
   * 5.2 → 05.02
   * @param  {Number} number Floating Point
   * @return {String}        Double padded Floating Point
   */
  zeroPad(number) {
    let roundedNumber = _.round(number, 2);
    let splitNumbers = roundedNumber.toString().split('.');

    // Pad single digits ignore otherwise
    let paddedSplitNumbers = [];
    splitNumbers.forEach(function(num, index) {
      if (num.length === 1) {
        paddedSplitNumbers[index] = '0' + num;
      } else {
        paddedSplitNumbers[index] = num;
      }
    });

    return paddedSplitNumbers.join('.');
  }

}

module.exports = new Utils();
