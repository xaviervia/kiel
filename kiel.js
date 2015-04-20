var Sydney = require("sydney")
var Scanner = require("./src/scanner");

var Kiel = function () {
  this.link(new Scanner)
}

Kiel.prototype = Object.create(Sydney.prototype)

module.exports = Kiel
