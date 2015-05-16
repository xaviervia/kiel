"use strict"


var example     = require("washington")
var net         = require("net")
var OP          = require("object-pattern")
var PortScanner = require("../src/port-scanner")


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
