const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');


/** handle output: write to console */
function handleOutput(text) {
    const mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

/** read file at path and print it out. */
function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            handleOutput(data);
        }
    });
}

/** read page at URL and print it out. */
async function webCat(url) {
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

/** The main function */
function main() {
    if (process.argv.length < 4) {
        console.error("Usage: node script.js <command> <path>");
        process.exit(1);
    }

    let command = process.argv[2];
    let path = process.argv[3];

    if (command === "file") {
        if (path.slice(0, 4) === 'http') {
            console.error("Expected a file path but got a URL.");
            process.exit(1);
        }
        cat(path);
    } else if (command === "url") {
        if (path.slice(0, 4) !== 'http') {
            console.error("Expected a URL but got a file path.");
            process.exit(1);
        }
        webCat(path);
    } else {
        console.error("Invalid command. Use 'file' or 'url'.");
        process.exit(1);
    }
}

main();
