// Kiel Host Scanner
// =================
//
// Usage
// -----
//
// Scan all 65536 ports in a host:
//
// ```javascript
// var HostScanner = require("kiel/src/host-scanner")
// var parsePattern = require("object-pattern").parse
// var hostScanner = new HostScanner
//
// hostScanner.add(parsePattern({
//   method: "GET",
//   resource: ["scan", "google.com", "*"]
// }), function (event) {
//   console.log("order to scan " + event.resource[2])
// })
//
// hostScanner.send({
//   method: "GET",
//   resource: ["scan", "google.com"]
// })
// ```
"use strict"


var OP      = require("object-pattern")
var example = require("washington")


var HostScanner = function () {}

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

example("Matches GET/scan/localhost", function () {
  return new HostScanner().endpoint.match({
    method: "GET",
    resource: ["scan", "localhost"]
  })
})

example("GET/scan/localhost calls port 0", function (done) {
  var hostScanner = new HostScanner
  var venue = {
    broadcast: function (event) {
      done(event.resource[2], 0)
    }
  }
  var event = {
    method: "GET",
    resource: ["scan", "localhost"]
  }

  hostScanner.callback(event, venue)
})


example("GET/scan/localhost calls port 65536", function (done) {
  var hostScanner = new HostScanner
  var index = 0
  var venue = {
    broadcast: function (event) {
      if (index == 65535)
        done(event.resource[2], 65535)

      index ++
    }
  }
  var event = {
    method: "GET",
    resource: ["scan", "localhost"]
  }

  hostScanner.callback(event, venue)
})


module.exports = HostScanner
