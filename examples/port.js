var example = require("washington")
var net     = require("net")
var Kiel    = require("../kiel")

example("GET/port/* connects to the given port", function (done) {
  var kiel = new Kiel

  var server = net.createServer(function () {
    server.close()
    done()
  })

  kiel.send({method: "GET", resource: ["port", 7070]})
})
