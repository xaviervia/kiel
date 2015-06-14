"use strict"


let example   = require("washington")
let OP        = require("object-pattern")
let jsverify  = require("jsverify")
let Scanner   = require("../src/scanner")


example("GET/scan matches", function () {
  return Scanner()["GET/scan"].endpoint.match({
    method: "GET",
    resource: ["scan"]
  })
})


example("GET/scan sends GET/interface from kiel.scanner", function (done) {
  let pattern = OP.parse({
    method: "GET",
    resource: ["interface"],
    from: ["**", "kiel.scanner", "**"]
  })

  Scanner()["GET/scan"].callback(
    {},
    {
      send: function (event) {
        if (pattern.match(event))
          done()

        else
          done("Wrong event emitted " + JSON.stringify(event))
      }
    }
  )
})


example("PUT/interface/*/* from kiel.scanner matches", function () {
  let scanner = Scanner()

  jsverify.assert(jsverify.forall(
    "string", "string",
    function (interf4ce, address) {
    scanner["PUT/interface/*/*"].endpoint.match({
      method: "PUT",
      resource: ["interface", interf4ce, address],
      from: ["kiel.scanner"]
    })

    return false
  }))
})
