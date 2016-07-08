import template from '../templates/ui.jade';

export default class GsapUi {
  constructor() {
    document.body.innerHTML += template({ name: 'World!' });
  }
};
