var set = function setValue() {
  return this;
}

let config = {

  className: 'gsap-ui',

  colors: {
    red: '#F44336',
    get cursor() {
      return this.red;
    }
  },

}

module.exports = config;
