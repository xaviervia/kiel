"use strict"


var OP = require("object-pattern")


module.exports = function () {
  return {
    "GET/scan": {
      endpoint: OP.parse({
        method: "GET",
        resource: ["scan"]
      }),

      callback: function (event, venue) {
        venue.send({
          method: "GET",
          resource: ["interface"],
          from: ["kiel.scanner"]
        })
      }
    },

    "PUT/interface/*/*": {
      endpoint: OP.parse({
        method: "PUT",
        resource: ["interface", "*", "*"],
        from: ["**", "kiel.scanner", "**"]
      })
    }
  }
}
