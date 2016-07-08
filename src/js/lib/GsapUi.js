import template from '../templates/ui.jade';
import styles from '../../scss/gsapui.scss';

export default class GsapUi {
  constructor() {
    document.body.innerHTML += template({ name: 'World!' });
  }
};
