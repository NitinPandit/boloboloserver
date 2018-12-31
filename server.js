// var socketIO = require('socket.io');
// var server = require('http').createServer().listen(7000, '0.0.0.0');
// var io = socketIO.listen(server);
// var users = {};
// io.on('connection', function (socket) {

//     console.log('New connection is created.');

//     socket.on('handshake', function (data) {
//         console.log('Handshaking...');
//         //console.log(data.fromPeerId);
//         //console.log(data.toPeerId);
        
//         users[data] = socket;
//         console.log('Exiting...');
//         socket.emit("createoffer", {});
//     });


//     socket.on('offer', function (data) {
//         console.log('offer');
//         console.log(data.type + " " + data.sdp);
//         console.log(data.fromPeerId);
//         console.log(data.toPeerId);
//         users[data.fromPeerId] = socket;
//         var toSendSocket = users[data.toPeerId];
//         console.log("Exit from offer....");
//         //console.log(toSendSocket);
//         toSendSocket.emit("offer", data);
       
//     });

//     socket.on('answer', function (data) {
//         console.log('answer');
//         //console.log(users[data.toPeerId]);
//         var toSendSocket = users[data.toPeerId];
//         console.log(data.toPeerId + "  " + data.fromPeerId);
//        // console.log(toSendSocket);
//         toSendSocket.emit("answer",data);
        
//     });

//     socket.on('candidate', function (data) {
//         console.log('candidate');
//         //console.log(data);
//         var toSendSocket = users[data.toPeerId];
//         toSendSocket.emit("candidate",data);
//         //console.log(toSendSocket);
//     });

//     });

var socketIO = require('socket.io');
var server = require('http').createServer().listen(process.env.PORT||7000, '0.0.0.0');
var io = socketIO.listen(server);

// Super simple server:
//  * One room only. 
//  * We expect two people max. 
//  * No error handling.

io.sockets.on('connection', function (client) {
    console.log('new connection: ' + client.id);

    client.on('offer', function (details) {
        client.broadcast.emit('offer', details);
        console.log('offer: ' + JSON.stringify(details));
    });

    client.on('answer', function (details) {
        client.broadcast.emit('answer', details);
        console.log('answer: ' + JSON.stringify(details));
    });
    
    client.on('candidate', function (details) {
        client.broadcast.emit('candidate', details);
        console.log('candidate: ' + JSON.stringify(details));
    });

    // Here starts evertyhing!
    // The first connection doesn't send anything (no other clients)
    // Second connection emits the message to start the SDP negotation
    client.broadcast.emit('createoffer', {});
});
