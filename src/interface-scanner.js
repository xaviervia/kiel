// Kiel Interface Scanner
// ======================
//
// Usage
// -----
//
// Get all available interfaces:
//
// ```javascript
// var InterfaceScanner = require("kiel/src/interface-scanner")
// var parsePattern = require("object-pattern").parse
// var interfaceScanner = new InterfaceScanner
//
// interfaceScanner.add(parsePattern({
//   method: "PUT",
//   resource: ["interface", "*", "*"]
// }), function (event) {
//   console.log(
//     "interface " + event.resource[1] +
//     " in address " + events.resource[2] +
//     " with data: " JSON.stringify(body)
//   )
// })
//
// interfaceScanner.send({
//   method: "GET",
//   resource: ["interface"]
// })
// ```
"use strict"


var example = require("washington")
var os      = require("os")
var OP      = require("object-pattern")
var Sydney  = require("sydney")


var InterfaceScanner = function () {}

InterfaceScanner.prototype = Object.create(Sydney.prototype)

InterfaceScanner.prototype.endpoint = OP.parse({
  method: "GET",
  resource: ["interface"]
})

InterfaceScanner.prototype.callback = function (event, venue) {
  var interfaces = os.networkInterfaces()
  Object.keys(interfaces).forEach(function (name) {
    interfaces[name].forEach(function (address) {
      var addressWithoutName = {}

      for (var key in address)
        if (key !== "address")
          addressWithoutName[key] = address[key]

      this.broadcast({
        method: "PUT",
        resource: ["interface", name, address.address],
        body: addressWithoutName
      })
    }.bind(this))
  }.bind(this))
}


example("GET/interface puts available interfaces", function (done) {
  var names = {}
  var interfaceScanner  = new InterfaceScanner

  Object.keys(os.networkInterfaces()).forEach(function (name) {
    names[name] = false
  })

  interfaceScanner.add(function (event) {
    var remaining = Object
      .keys(names)
      .filter(function (name) { return ! names[name] })

    if (remaining.length === 1 && remaining[0] === event.resource[1])
      done()
      
    else
      names[event.resource[1]] = true
  })

  interfaceScanner.send({
    method: "GET",
    resource: ["interface"]
  })
})


example("GET/interface puts addresses of the interfaces", function (done) {
  var interfaces    = os.networkInterfaces()
  var interfaceTree = {}
  var interfaceScanner  = new InterfaceScanner

  Object.keys(interfaces).forEach(function (name) {
    interfaceTree[name] = interfaceTree[name] || {}
    interfaces[name].forEach(function (address) {
      interfaceTree[name][address.address] = false
    })
  })

  interfaceScanner.add(function (event) {
    var currentInterface = interfaceTree[event.resource[1]]

    Object.keys(currentInterface)
      .filter(function (name) { return ! currentInterface[name] })
      .length === 1 ?
        (
          currentInterface[event.resource[2]] === false ?
            done() :
            done("not ok")
        ) :
        currentInterface[event.resource[2]] = true
  })

  interfaceScanner.send({
    method: "GET",
    resource: ["interface"]
  })
})


example("GET/interface puts the details of the interface", function (done) {
  var interfaces  = os.networkInterfaces()
  var target      = { interface: Object.keys(interfaces)[0] }
  var interfaceScanner = new InterfaceScanner

  target.address = interfaces[target.interface][0].address
  target.content = {}

  Object.keys(interfaces[target.interface][0]).forEach(function (key) {
    if (key !== "address")
      target.content[key] = interfaces[target.interface][0][key]
  })

  interfaceScanner.add(function (event) {
    if (event.resource[1] === target.interface &&
        event.resource[2] === target.address) {
      done(JSON.stringify(event.body), JSON.stringify(target.content))
    }
  })

  interfaceScanner.send({
    method: "GET",
    resource: ["interface"]
  })
})


module.exports = InterfaceScanner
