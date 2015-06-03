// Kiel
// ====
//
// [ ![Codeship Status for xaviervia/kiel](https://codeship.com/projects/9a430a70-de54-0132-dcb9-72308c200ea3/status?branch=master)](https://codeship.com/projects/80393)
//
// Eager network / port / service scanner for Node.js
//
// Installation
// ------------
//
// ```
// npm install --save kiel
// ```
//
// Usage
// -----
//
// Too α for that, refer to the specific modules:
//
// - [PortScanner](src/port-scanner.md)
// - [HostScanner](src/host-scanner.md)
// - [InterfaceScanner](src/interface-scanner.md)
// - [WildScanner](src/wild-scanner.md)
//
"use strict"


var Sydney            = require("sydney")
var example           = require("washington")

var PortScanner       = require("./src/port-scanner")
var HostScanner       = require("./src/host-scanner")
var InterfaceScanner  = require("./src/interface-scanner")
var WildScanner       = require("./src/wild-scanner")


var Kiel = function () {
  this.link(new PortScanner)
  this.link(new HostScanner)
  this.link(new InterfaceScanner)
  this.link(new WildScanner.Scan)
  this.link(new WildScanner.AdaptToScan)
}

Kiel.prototype = Object.create(Sydney.prototype)


example("Kiel should have a PortScanner linked", function () {
  var kiel = new Kiel

  var portScanner = kiel.subscribers.filter(function (subscriber) {
    return subscriber.endpoint === PortScanner.prototype.endpoint
  })[0]

  return portScanner.subscribers.indexOf(kiel) > -1
})

example("Kiel should have a HostScanner linked", function () {
  var kiel = new Kiel

  var hostScanner = kiel.subscribers.filter(function (subscriber) {
    return subscriber.endpoint === HostScanner.prototype.endpoint
  })[0]

  return hostScanner.subscribers.indexOf(kiel) > -1
})

example("Kiel should have a InterfaceScanner linked", function () {
  var kiel = new Kiel

  var interfaceScanner = kiel.subscribers.filter(function (subscriber) {
    return subscriber.endpoint === InterfaceScanner.prototype.endpoint
  })[0]

  return interfaceScanner.subscribers.indexOf(kiel) > -1
})

example("Kiel should have a WildScanner.Scan linked", function () {
  var kiel = new Kiel

  var wildScannerScan = kiel.subscribers.filter(function (subscriber) {
    return subscriber.endpoint === WildScanner.Scan.prototype.endpoint
  })[0]

  return wildScannerScan.subscribers.indexOf(kiel) > -1
})

example("Kiel should have a WildScanner.AdaptToScan linked", function () {
  var kiel = new Kiel

  var wildScannerAdaptToScan = kiel.subscribers.filter(function (subscriber) {
    return subscriber.endpoint === WildScanner.AdaptToScan.prototype.endpoint
  })[0]

  return wildScannerAdaptToScan.subscribers.indexOf(kiel) > -1
})


module.exports = Kiel

// Testing
// -------
//
// ```
// git clone git://github.com/xaviervia/kiel
// cd kiel
// npm install
// npm test
// ```
//
// License
// -------
//
// Copyright 2015 Xavier Via
//
// ISC license.
//
// See [LICENSE](LICENSE) attached.
