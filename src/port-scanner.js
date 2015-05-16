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


example("GET/scan/localhost/7070 connects to the given port", function (done) {
  var portScanner = new PortScanner

  var server = net.createServer(function () {
    server.close()
    done()
  })

  server.listen(7070, function () {
    portScanner.send({method: "GET", resource: ["scan", "localhost", 7070]})
  })
})


example("GET/scan/localhost/7070 puts when it is found", function (done) {
  var portScanner = new PortScanner

  portScanner.add(
    OP.parse({
      method: "PUT",
      resource: ["scan", "localhost", 7070]
    }),
    function () { done() }
  )

  var server = net.createServer(function () {
    server.close()
  })

  server.listen(7070, function () {
    portScanner.send({method: "GET", resource: ["scan", "localhost", 7070]})
  })
})


example("GET/scan/localhost/7070 deletes when nothing found", function (done) {
  var portScanner = new PortScanner

  portScanner.add(
    OP.parse({
      method: "DELETE",
      resource: ["scan", "localhost", 7070]
    }),
    function () { done() }
  )

  portScanner.send({method: "GET", resource: ["scan", "localhost", 7070]})
})


module.exports = PortScanner
