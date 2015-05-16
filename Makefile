VERSION = $(shell sed -n 's/[ ]*"version":[ ]*"\(.*\)",*/\1/p' package.json)

build:
	docker build -t xaviervia/kiel:$(VERSION) .

test:
	docker run -v $(shell pwd):/usr/src/app xaviervia/kiel:$(VERSION) npm test
