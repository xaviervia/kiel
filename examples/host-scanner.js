"use strict"


var example     = require("washington")
var net         = require("net")
var OP          = require("object-pattern")
var HostScanner = require("../src/host-scanner")


example("GET/scan/localhost calls port 0", function (done) {
  var hostScanner = new HostScanner

  hostScanner.add(function (event) {
    done(event.resource[2], 0)
  })

  hostScanner.send({method: "GET", resource: ["scan", "localhost"]})
})


example("GET/scan/localhost calls port 65536", function (done) {
  var hostScanner = new HostScanner
  var index = 0

  hostScanner.add(function (event) {
    if (index == 65535)
      done(event.resource[2], 65535)

    index ++
  })

  hostScanner.send({method: "GET", resource: ["scan", "localhost"]})
})
