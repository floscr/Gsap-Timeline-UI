// Packages
import WebFont from 'webfontloader'

// Components
// import Timeline from './components/Timeline.js'
// import ButtonUi from './components/ButtonUi.js'
// import Controller from './components/Controller.js'

import _ from 'lodash'

// Styles and templates
import uiTemplate from './assets/ui.html'
// import styles from '../../scss/gsapui.scss'

import config from './config'

export default class GsapUi {

  constructor (timelines, customConfig = {}) {
    this.config = config

    this.timelines = []
    this.activeTimeline = {}

    this.elements = {}
    this.components = {}

    // Merge the predefined config and the passed config object
    _.merge(this.config, customConfig)

    // this.controller = new Controller({
    //   config: this.config,
    //   activeTimeline: this.activeTimeline,
    // })

    this._setupPublicAPI()

    // this.createContainerNode()
    //
    // // Default config for all classes
    // let componentConfig = {
    //   config: this.config,
    //   activeTimeline: this.activeTimeline,
    //   container: this.elements.container,
    // }
    // componentConfig.controller = this.controller
    //
    // this.components.timeline = new Timeline(componentConfig)
    // this.components.buttonUi = new ButtonUi(componentConfig)
    //
    // this.controller.components.timeline = this.components.timeline
    // this.controller.components.buttonUi = this.components.buttonUi
    //
    // this.controller.restoreTimelineState()
    // this.update()
    //
    // this.addEventListeners()
  }

  /**
   * Set up the public api methods.
   */
  _setupPublicAPI () {
    // Add timelines
    this.add = this._addTimeline

    // Play / Pause Toggling
    this.pause = () => this._togglePlayPause('pause')
    this.play = () => this._togglePlayPause('play')
    this.toggle = this._togglePlayPause
  }

  /**
   * Add a timeline to GsapUi
   */
  _addTimeline (timeline) {
    this.timelines.push(timeline)

    // Set the first timeline as the active timeline
    this.activeTimeline = this.timelines[0]
  }

  /**
   * Set the active timeline play state to a new state.
   * When no new state argument is given, toggle the current play state.
   * @par newState 'play', 'pause'
   */
  _togglePlayPause (newState = undefined) {
    if (!this.activeTimeline) return

    if (newState === 'pause') {
      this.activeTimeline.pause()
      return
    } else if (newState === 'play') {
      this.activeTimeline.play()
      return
    }

    // Toggle play pause
    this.activeTimeline.paused(this.activeTimeline.paused)
  }

  createContainerNode () {
    // Create container element and add template from jade
    let containerEl = document.createElement('div')
    containerEl.id = 'gsapui'
    containerEl.className = 'gsapui'

    // Disable Browser Drag and Drop functionality
    containerEl.setAttribute('ondragstart', 'return false')
    containerEl.setAttribute('ondrop', 'return false')

    containerEl.innerHTML = uiTemplate({
      settings: this.controller._settings,
    })

    this.config.rootElement.appendChild(containerEl)
    this.elements.container = containerEl

    WebFont.load({
      google: {
        families: ['Material Icons'],
      },
    })
  }

  addEventListeners () {
    this.activeTimeline.eventCallback('onUpdate', () => this.update())
  }

  update () {
    let progress = this.components.timeline.progress = this.activeTimeline.progress()

    this.controller.store.progress = progress

    this.components.timeline.update()
  }

}
