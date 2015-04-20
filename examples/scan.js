"use strict"


var example = require("washington")
var net     = require("net")
var Sydney  = require("sydney")
var OP      = require("object-pattern")
var Kiel    = require("../kiel")


example("GET/scan/localhost/7070 connects to the given port", function (done) {
  var kiel = new Kiel

  var server = net.createServer(function () {
    server.close()
    done()
  })

  server.listen(7070, function () {
    kiel.send({method: "GET", resource: ["scan", "localhost", 7070]})
  })
})


example("GET/scan/localhost/7070 puts when it is found", function (done) {
  var kiel = new Kiel

  kiel.add(
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
    kiel.send({method: "GET", resource: ["scan", "localhost", 7070]})
  })
})


example("GET/scan/localhost/7070 deletes when nothing found", function (done) {
  var kiel = new Kiel

  kiel.add(
    OP.parse({
      method: "DELETE",
      resource: ["scan", "localhost", 7070]
    }),
    function () { done() }
  )

  kiel.send({method: "GET", resource: ["scan", "localhost", 7070]})
})
