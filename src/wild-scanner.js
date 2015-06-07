"use strict"


var OP      = require("object-pattern")
var example = require("washington")


var WildScanner = {
  Scan: function () {},
  AdaptToScan: function () {}
}


WildScanner.Scan.prototype.endpoint = OP.parse({
  method: "GET",
  resource: ["scan"]
})


example("WildScanner.Scan #endpoint matches GET/scan", function () {
  return new WildScanner.Scan().endpoint.match({
    method: "GET",
    resource: ["scan"]
  })
})


WildScanner.Scan.prototype.callback = function (event, venue) {
  venue.broadcast({
    method: "GET",
    resource: ["interface"],
    from: ["kiel/wild-scanner/scan"]
  })
}


example(
  "WildScanner.Scan calls GET/interface,from:/'kiel/wild-scanner/scan' on venue",
  function (done) {
  var venue = {
    broadcast: function (event) {
      if (OP.parse({
        method: "GET",
        resource: ["interface"],
        from: ["**", "kiel/wild-scanner/scan", "**"]
      })) done()

      else done("Wrong event sent")
    }
  }
  var event = {
    method: "GET",
    resource: ["interface"]
  }
  var scan = new WildScanner.Scan()

  scan.callback(event, venue)
})


WildScanner.AdaptToScan.prototype.endpoint = OP.parse({
  method: "PUT",
  resource: ["interface", "*", "*"],
  from: ["kiel/wild-scanner/scan"]
})


example(
  "WildScanner.AdaptToScan #endpoint matches PUT/interface/*/*,from:/'kiel/wild-scanner/scan'",
  function () {
  return new WildScanner.AdaptToScan().endpoint.match({
    method: "PUT",
    resource: ["interface", "eth0", "::1"],
    from: ["kiel/wild-scanner/scan"]
  })
})


example(
  "WildScanner.AdaptToScan #endpoint does not match PUT/interface/*/*",
  function () {
  return ! new WildScanner.AdaptToScan().endpoint.match({
    method: "PUT",
    resource: ["interface", "eth0", "::1"]
  })
})


WildScanner.AdaptToScan.prototype.callback = function (event, venue) {
  venue.broadcast({
    method: "GET",
    resource: ["scan", event.resource[2]],
    from: ["kiel/wild-scanner/scan", "kiel/wild-scanner/adapt-to-scan"]
  })
}


example(
  "WildScanner.AdaptToScan calls GET/scan/<resource[2]>,from:/'kiel/wild-scanner/scan'/'kiel/wild-scanner/adapt-to-scan'",
  function (done) {
  var targetInterface = "fe80::1"
  var venue = {
    broadcast: function (event) {
      if (event.method === "GET" &&
          event.resource[0] === "scan" &&
          event.resource[1] === targetInterface &&
          event.from[0] === "kiel/wild-scanner/scan" &&
          event.from[1] === "kiel/wild-scanner/adapt-to-scan")
        done()
      else
        done("Wrong event")
    }
  }
  var event = {
    method: "PUT",
    resource: ["interface", "wlan0", targetInterface]
  }
  var adaptToScan = new WildScanner.AdaptToScan

  adaptToScan.callback(event, venue)
})


module.exports = WildScanner
