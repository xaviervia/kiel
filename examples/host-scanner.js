"use strict"

let example = require("washington")

example("GET/scan matches", function () {
  return GETScan().endpoint.match({
    method: "GET",
    resource: ["scan"]
  })
})
