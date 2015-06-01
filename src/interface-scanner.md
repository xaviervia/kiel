Kiel Interface Scanner
======================

Usage
-----

Get all available interfaces:

```javascript
var InterfaceScanner = require("kiel/src/interface-scanner")
var parsePattern = require("object-pattern").parse
var Sydney = require("sydney")
var interfaceScanner = new Sydney(new InterfaceScanner)

interfaceScanner.add(parsePattern({
  method: "PUT",
  resource: ["interface", "*", "*"]
}), function (event) {
  console.log(
    "interface " + event.resource[1] +
    " in address " + event.resource[2] +
    " with data: + " JSON.stringify(event.body)
  )
})

interfaceScanner.send({
  method: "GET",
  resource: ["interface"]
})
```
