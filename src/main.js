import uiLoad from './ui.html'
import style from './ui.scss'

// const template = uiLoad({ foo: 'bar' })

class GsapUi {

  constructor () {
    console.log('Constructed')
  }

  testMessageApi () {
    this._testMessage()
  }

  _testMessage () {
    console.log('Method called')
  }

}

/* eslint no-new: 0 */
module.exports = new GsapUi()
