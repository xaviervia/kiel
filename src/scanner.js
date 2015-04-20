var Sydney = require("sydney")
var OP     = require("object-pattern")
var net    = require("net")

var Scanner = function () {
  this.endpoint = OP.parse({
    method: "GET",
    resource: ["scan", "*", "*"]
  })
}

Scanner.prototype = Object.create(Sydney.prototype)

Scanner.prototype.endpoint = OP.parse({
  method: "GET",
  resource: ["scan", "*", "*"]
})

Scanner.prototype.callback = function (event, venue) {
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

module.exports = Scanner
