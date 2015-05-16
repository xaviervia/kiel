// Kiel
// ====
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
//
"use strict"


var Sydney            = require("sydney")
var PortScanner       = require("./src/port-scanner")
var HostScanner       = require("./src/host-scanner")
var InterfaceScanner  = require("./src/interface-scanner")


var Kiel = function () {
  this.link(new PortScanner)
  this.link(new HostScanner)
  this.link(new InterfaceScanner)
}

Kiel.prototype = Object.create(Sydney.prototype)


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
