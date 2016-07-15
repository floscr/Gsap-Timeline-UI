// Packages
import WebFont from 'webfontloader';

// Components
import Timeline from './components/Timeline.js';
import ButtonUi from './components/ButtonUi.js';
import Controller from './components/Controller.js';
import GUtils from './utils/Gutils.js'

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

    this.createNode();
    this.components.timeline = new Timeline(this.elements.container, this.activeTimeline);
    this.components.buttonUi = new ButtonUi(this.elements.container, this.activeTimeline);
    this.addEventListeners();

    this.activeTimeline.pause();
    this.activeTimeline.progress(0.5);
  }

  createNode() {
    // Create container element from jade template
    let containerEl = document.createElement('div');
    containerEl.id = 'gsapui';
    containerEl.className = 'gsapui';
    containerEl.innerHTML = template();
    this.config.rootElement.appendChild(containerEl);
    this.elements.container = containerEl;
    WebFont.load({
      google: {
        families: ['Material Icons'],
      },
    })
  }

  addEventListeners() {
    this.activeTimeline.eventCallback('onUpdate', () => this.update());
    document.addEventListener('keydown', evt => this.listenForKeyboardShortcuts(evt));
  }

  listenForKeyboardShortcuts(evt) {
    switch(evt.keyCode) {
      case 32: this.togglePlayPause(); break; // Q
    }
  }

  togglePlayPause() {
    GUtils.togglePlayPause(this.activeTimeline);
    this.components.buttonUi.togglePlayPause();
  }

  update() {
    this.components.timeline.progress = this.activeTimeline.progress();
    this.components.timeline.update();
  }

};
