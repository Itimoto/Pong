const http          = require("http");
const express       = require("express");
const path          = require("path");
const WebSocket     = require("ws");
const WebSocketServer  = WebSocket.Server;

const PongManager = require('./lib/pong/client-manager');

// Set up Express Server

const INDEX = path.join(__dirname + "/public", "indexPongTest.html");

var app = express();
//public website
app.use(express.static(__dirname + '/public'));

app.get('/pong', function (req, res) {
    res.sendFile(INDEX);
});

const server = http.createServer(app);


// Create WS Server for Pong
var commWSS = new WebSocketServer({ port: 8082 });

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