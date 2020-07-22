const http          = require("http");
const express       = require("express");
const path          = require("path");
const WebSocket     = require("ws");

const PongManager = require('./lib/pong/client-manager');

// Set up Express Server

const PONGFILE = path.join(__dirname + "/public", "pong.html");

var app = express();

// Serve our Pong JS files
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(PONGFILE);
});

const server = http.createServer(app);

// Create WS Server for Pong
const commWSS = new WebSocket.Server({ port: 8082 });

commWSS.on('connection', (socket) => {
    console.log("New Connection");

    socket.on('message', (data) => {
        let genReq = data.split(' ');
        //console.log("CLIENT SAYS: " + genReq);

        if(genReq[0] == 'CLIENT')
            socket.send("QU " + 0); 
        
        if(genReq[0] == 'ReqPong')
            PongManager.pongRequested(socket);
    });

    //socket.prependOnceListener('close', PongManager.endGame);
    // Socket-closing is handled in the PongManager
});

server.listen(80);  // Start listening on Default port