#!/usr/bin/env node
const debounce = require("lodash.debounce") // named debounce instead of lodashDebounce since lodash has way more functionalities than debounce
const chokidar = require("chokidar") //named chokidar since it's a simple program
const program = require("caporal") //named program because the documentation says so

const start = debounce(() => {
    console.log("Starting user's program")
}, 100)

chokidar
    .watch(".")
    .on("add", start)
    .on("change", () => console.log("File changed"))
    .on("unlink", () => console.log("File unlinked"))