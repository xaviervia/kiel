Kiel Interface Scanner
======================

Usage
-----

Get all available interfaces:

```javascript
var InterfaceScanner = require("kiel/src/interface-scanner")
var parsePattern = require("object-pattern").parse
var interfaceScanner = new InterfaceScanner

interfaceScanner.add(parsePattern({
  method: "PUT",
  resource: ["interface", "*", "*"]
}), function (event) {
  console.log(
    "interface " + event.resource[1] +
    " in address " + events.resource[2] +
    " with data: " JSON.stringify(body)
  )
})

interfaceScanner.send({
  method: "GET",
  resource: ["interface"]
})
```
