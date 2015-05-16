"use strict"


var Sydney = require("sydney")
var OP     = require("object-pattern")


var HostScanner = function () {}

HostScanner.prototype = Object.create(Sydney.prototype)

HostScanner.prototype.endpoint = OP.parse({
  method: "GET",
  resource: ["scan", "*"]
})

HostScanner.prototype.callback = function (event, venue) {
  for (var i = 0; i < 65536; i ++) {
    venue.broadcast({
      method: "GET",
      resource: ["scan", event.resource[1], i]
    })
  }
}


module.exports = HostScanner
