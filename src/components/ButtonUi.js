import BaseComponent from './BaseComponent.js'

class ButtonUi extends BaseComponent {

  init () {
    this.createUi()
  }

  createUi () {
    // Shorthand for the data attribute query selector
    var qs = function (attr, dataAttr = 'action') {
      return this.querySelector(`[data-${dataAttr}=${attr}]`)
    }.bind(this.elements.container)

    this.elements.buttons = {}
    this.elements.buttons.forward = qs('forward')
    this.elements.buttons.backward = qs('backward')
    this.elements.buttons.togglePlay = qs('toggleplay')

    this.elements.buttons.slower = qs('slower')
    this.elements.buttons.faster = qs('faster')
    this.elements.timeScale = qs('timeScale')

    this.elements.toggles = {}
    this.elements.toggles.savePosition = qs('isSavingPosition', 'option')
    console.log(this.elements.toggles.savePosition)

    // Toggle Play Pause
    this.elements.buttons.togglePlay.addEventListener('mouseup', evt => {
      this.controller.togglePlayPause()
    })

    // Skip forward / backward
    this.elements.buttons.forward.addEventListener('mouseup', evt => {
      this.controller.skipForward()
    })
    this.elements.buttons.backward.addEventListener('mouseup', evt => {
      this.controller.skipBackward()
    })

    // Skip forward / backward
    this.elements.buttons.slower.addEventListener('mouseup', evt => {
      this.controller.slower()
    })
    this.elements.buttons.faster.addEventListener('mouseup', evt => {
      this.controller.faster()
    })

    this.elements.timeScale.addEventListener('click', evt => {
      evt.target.select()
    })
    this.elements.timeScale.addEventListener('input', evt => {
      this.controller.setTimeScaleTo(parseInt(evt.target.value))
    })

    this.elements.toggles.savePosition.addEventListener('change', evt => {
      this.controller.isSavingPosition = evt.target.checked
    })
  }

  updateTimeScale (timeScale) {
    this.elements.timeScale.value = timeScale
  }

  setToPlay (isPlaying) {
    this.elements.buttons.togglePlay.innerHTML = isPlaying ? 'play_arrow' : 'pause'
  }

}
export default ButtonUi
