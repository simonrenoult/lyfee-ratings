.DEFAULT_GOAL := help

.SILENT: help
.PHONY: help
help:
	echo
	echo "Usage: make <command>"
	echo
	echo "Application lifecycle management command list."
	echo
	echo "Commands:"
	echo
	echo "  help              print this help"
	echo "  install           install dependencies (using yarn)"
	echo "  test              run linter, unit and integration tests"
	echo "  start             shortcut for start-container"
	echo "  run               alias for start"
	echo

.PHONY: install
.SILENT: install
install:
	yarn install

.PHONY: test
.SILENT: test
test:
	yarn test

.PHONY: run
.SILENT: run
run:
	yarn start

.PHONY: start
.SILENT: start
start:
	yarn start
