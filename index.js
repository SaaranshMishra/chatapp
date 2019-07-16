var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
port = process.env.PORT || 4000;
var server = app.listen(port, function() {
	console.log(`Listening for requests on port ${port}`);
});

// Static files
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection', function(socket) {
	console.log('Made socket connection', socket.id);

	// Handle chat event
	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

	// Broadcast typing event
	socket.on('typing', function(data) {
		socket.broadcast.emit('typing', data);
	});
});