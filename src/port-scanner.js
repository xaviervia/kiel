// Kiel Port Scanner
// =================
//
// Usage
// -----
//
// Find out if a port is open:
//
// ```javascript
// var PortScanner = require("kiel/src/port-scanner")
// var parsePattern = require("object-pattern").parse
// var Sydney = require("sydney")
// var portScanner = new Sydney(new PortScanner)
//
// portScanner.add(parsePattern({
//   method: "PUT",
//   resource: ["scan", "localhost", 8000]
// }), function (event) {
//   console.log("8000 is open")
// })
//
// portScanner.add(parsePattern({
//   method: "DELETE",
//   resource: ["scan", "localhost", 8000]
// }), function (event) {
//   console.log("8000 is closed")
// })
//
// portScanner.send({
//   method: "GET",
//   resource: ["scan", "localhost", 8000]
// })
// ```
"use strict"


var Sydney  = require("sydney")
var OP      = require("object-pattern")
var net     = require("net")
var example = require("washington")


var PortScanner = function () {}

PortScanner.prototype = Object.create(Sydney.prototype)

PortScanner.prototype.endpoint = OP.parse({
  method: "GET",
  resource: ["scan", "*", "*"]
})

PortScanner.prototype.callback = function (event, venue) {
  var port = parseInt(event.resource[2], 10)
  var host = event.resource[1]

  this.socket = net.connect(port, host, function () {
    venue.broadcast({
      method: "PUT",
      resource: ["scan", host, port]
    })
  })

  this.socket.on("error", function () {
    venue.broadcast({
      method: "DELETE",
      resource: ["scan", host, port]
    })
  })
}


example("PortScanner #endpoint matches GET/scan/localhost/7070", function () {
  return new PortScanner().endpoint.match({
    method: "GET",
    resource: ["scan", "localhost", 7070]
  })
})


example("PortScanner #callback connects to the given port", function (done) {
  var portScanner = new PortScanner
  var venue = {
    broadcast: function () {}
  }

  var server = net.createServer(function () {
    server.close()
    done()
  })

  server.listen(7070, function () {
    portScanner.callback({
      method: "GET",
      resource: ["scan", "localhost", 7070]
    }, venue)
  })
})


example("PortScanner #callback puts when it is found", function (done) {
  var portScanner = new PortScanner
  var venue = {
    broadcast: function (event) {
      if (OP.parse({
        method: "PUT",
        resource: ["scan", "localhost", 7070]
      })) done()
    }
  }

  var server = net.createServer(function () {
    server.close()
  })

  server.listen(7070, function () {
    portScanner.callback({
      method: "GET",
      resource: ["scan", "localhost", 7070]
    }, venue)
  })
})


example("PortScanner #callback deletes when nothing found", function (done) {
  var portScanner = new PortScanner
  var venue = { broadcast: function (event) {
    if (OP.parse({
      method: "DELETE",
      resource: ["scan", "localhost", 7070]
    })) done()
  }}

  portScanner.callback({
    method: "GET",
    resource: ["scan", "localhost", 7070]
  }, venue)
})


module.exports = PortScanner
