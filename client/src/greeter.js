import EventEmitter from 'events'
import util from 'util'

function Greetr () {
  this.greeting = 'Hello world!'
}
util.inherits(Greetr, EventEmitter)
Greetr.prototype.greet = function (data) {
  console.log(`${this.greeting} : ${data}`)
  this.emit('greet', data)
}

const greeter = new Greetr()
greeter.on('greet', function (data) {
  console.log(`Someone greeted! ${data}`)
})

export { greeter as default }
