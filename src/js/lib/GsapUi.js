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


    this.createContainerNode();
    let componentConfig = {
      activeTimeline: this.activeTimeline,
      container: this.elements.container,
    }
    this.controller = new Controller(componentConfig);
    componentConfig.controller = this.controller;

    this.components.timeline = new Timeline(componentConfig);
    this.components.buttonUi = new ButtonUi(componentConfig);

    this.controller.components.timeline = this.components.timeline;
    this.controller.components.buttonUi = this.components.buttonUi;

    this.addEventListeners();

    this.activeTimeline.pause();
    this.activeTimeline.progress(0.5);
  }

  createContainerNode() {
    // Create container element and add template from jade
    let containerEl = document.createElement('div');
    containerEl.id = 'gsapui';
    containerEl.className = 'gsapui';

    // Disable Browser Drag and Drop functionality
    containerEl.setAttribute('ondragstart', 'return false;');
    containerEl.setAttribute('ondrop', 'return false;');

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
