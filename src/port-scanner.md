Kiel Port Scanner
=================

Usage
-----

Find out if a port is open:

```javascript
var PortScanner = require("kiel/src/port-scanner")
var parsePattern = require("object-pattern").parse
var Sydney = require("sydney")
var portScanner = new Sydney(new PortScanner)

portScanner.add(parsePattern({
  method: "PUT",
  resource: ["scan", "localhost", 8000]
}), function (event) {
  console.log("8000 is open")
})

portScanner.add(parsePattern({
  method: "DELETE",
  resource: ["scan", "localhost", 8000]
}), function (event) {
  console.log("8000 is closed")
})

portScanner.send({
  method: "GET",
  resource: ["scan", "localhost", 8000]
})
```
