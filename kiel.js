var Sydney = require("sydney")
var PortScanner = require("./src/port-scanner")
var HostScanner = require("./src/host-scanner")

var Kiel = function () {
  this.link(new PortScanner)
  this.link(new HostScanner)
}

Kiel.prototype = Object.create(Sydney.prototype)

Kiel.prototype.callback = function (event, venue) {
  console.log(event)
  venue.broadcast(event)
}

module.exports = Kiel
