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

    // this.controller = new Controller(this.config, this.activeTimeline);

    this.createContainerNode();
    let componentConfig = {
      activeTimeline: this.activeTimeline,
      container: this.elements.container,
    }
    this.components.timeline = new Timeline(componentConfig);
    this.components.buttonUi = new ButtonUi(componentConfig);
    this.addEventListeners();

    this.activeTimeline.pause();
    this.activeTimeline.progress(0.5);
  }

  createContainerNode() {
    // Create container element and add template from jade
    let containerEl = document.createElement('div');
    containerEl.id = 'gsapui';
    containerEl.className = 'gsapui';
    containerEl.innerHTML = template();

    // Disable Browser Drag and Drop functionality
    containerEl.setAttribute('ondragstart', 'return false;');
    containerEl.setAttribute('ondrop', 'return false;');

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
      case 37: this.togglePlayPause(); break; // ←
      case 39: this.togglePlayPause(); break; // →
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
