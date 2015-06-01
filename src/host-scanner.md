Kiel Host Scanner
=================

Usage
-----

Scan all 65536 ports in a host:

```javascript
var HostScanner = require("kiel/src/host-scanner")
var parsePattern = require("object-pattern").parse
var Sydney = require("sydney")
var hostScanner = new Sydney(new HostScanner)

hostScanner.add(parsePattern({
  method: "GET",
  resource: ["scan", "google.com", "*"]
}), function (event) {
  console.log("order to scan " + event.resource[2])
})

hostScanner.send({
  method: "GET",
  resource: ["scan", "google.com"]
})
```
