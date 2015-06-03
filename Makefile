VERSION = $(shell sed -n 's/[ ]*"version":[ ]*"\(.*\)",*/\1/p' package.json)

build: install doc test

doc:
	npm run doc

install:
	npm install

test:
	npm test


############################################################
# DOCKER
############################################################
docker-build:
	docker build -t xaviervia/kiel:$(VERSION) .

docker-test:
	docker run -v $(shell pwd):/usr/src/app xaviervia/kiel:$(VERSION) npm test
