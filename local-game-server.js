// Note: NOT a 'local server', but rather a server that serves a game that can be /played locally/
const http          = require("http");
const express       = require("express");
const path          = require("path");

const PongManager = require('./lib/pong/client-manager');

// Set up Express Server

const PONGFILE = path.join(__dirname + "/public", "literally just pong.html");

var app = express();

// Serve our Pong JS files
app.get('/', function (req, res) {
    res.sendFile(PONGFILE);
});

const server = http.createServer(app);
server.listen(80);  // Start listening on Default port