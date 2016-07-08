var Button = class Button {

  constructor(props) {
    this.btn = document.createElement('a');

    if (props.content) {
      this.btn.appendChild(document.createTextNode(props.content));
    };

    props.classNames.forEach((name)=> this.btn.classList.add(name));
    this.btn.addEventListener('click', props.handler, false);

    return this.btn;
  }
};

module.exports = Button;
