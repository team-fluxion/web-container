/* global module require __dirname */

const path = require('path');
const fs = require('fs');

const express = require('express');

const basePath = path.join(__dirname, './');
const { appName } = require('./config.json');

const readFile = (basePath, filePath) => {
    try {
        // Attempt reading file contents
        return fs.readFileSync(
            path.join(basePath, filePath),
            'utf8'
        );
    } catch (e) {
        // Return error
        return `File "${filePath}" doesn\'t exist!`;
    }
};

module.exports = portNumber => {
    // Create web-app and perform init
    const app = express();

    // Setup statics
    app.use(express.static(path.join(basePath, 'public')));

    // Start the web server
    app.listen(
        portNumber,
        () => {
            console.log(appName, 'started on', portNumber);
        }
    );

    // Serve index page
    app.get('*', ({ url }, res) => {
        // Normalize path
        const path = url === '/' ? '/index.html' : url;

        // Serve the file and end the response
        res.send(readFile(basePath, `public${path}`));
    });
};
