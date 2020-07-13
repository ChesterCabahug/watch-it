#!/usr/bin/env node
const debounce = require("lodash.debounce") // named debounce instead of lodashDebounce since lodash has way more functionalities than debounce
const chokidar = require("chokidar") //named chokidar since it's a simple program
const program = require("caporal") //named program because the documentation says so
const fs = require("fs")
const { spawn } = require("child_process")

program
    .version("0.0.1")
    .argument("[filename]", "Name of a file to execute")
    .action(async ({ filename }) => {
        const name = filename || "index.js"
        try {
            await fs.promises.access(name)
        } catch (error) {
            throw new Error(`Could not find the file ${name}`)
        }

        const start = debounce(() => {
            spawn("node", [name])
        }, 100)
        
        chokidar
            .watch(".")
            .on("add", start)
            .on("change", start)
            .on("unlink", start)
    })

program.parse(process.argv)

