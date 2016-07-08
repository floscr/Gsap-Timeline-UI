// Components
import Timeline from './components/Timeline.js';

// Styles and templates
import template from '../templates/ui.jade';
import styles from '../../scss/gsapui.scss';

export default class GsapUi {
  constructor(timelines) {

    this.config = {
      rootElement: document.body,
    };

    this.elements = {};
    this.timelines = [];
    this.components = {};

    // Accept single and multiple timeline objects
    if (timelines instanceof Array) {
      this.timelines.push(...timelines);
    } else {
      this.timelines.push(timelines);
    }

    // Set the first timeline as the active timeline
    this.activeTimeline = this.timelines[0];

    this.createUi();
    this.addEventListeners();
  }

  createUi() {
    // Create container element from jade template
    let containerEl = document.createElement('div');
    containerEl.id = 'gsapui';
    containerEl.className = 'gsapui';
    containerEl.innerHTML = template();
    this.config.rootElement.appendChild(containerEl);
    this.elements.container = containerEl;


    this.components.timeline = new Timeline(containerEl);
  }

  addEventListeners() {
    this.activeTimeline.eventCallback('onUpdate', () => this.update());
    // window.addEventListener('keydown', (e)=>this.checkKeyCode(e), false);
  }

  update() {
    this.components.timeline.progress = this.activeTimeline.progress();
    this.components.timeline.update();
  }

};
