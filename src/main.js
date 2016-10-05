import html from './test.html'

const template = html({ foo: 'bar' })

console.log(template)

module.exports = {
  lol: 'hey',
  init () {
    console.log(this.lol)
  }
}

console.log('Hello World')
