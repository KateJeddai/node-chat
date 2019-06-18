const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.emit('newMessage', {
			from: "admin",
			text: "welcome",
			createdAt: new Date().getTime()
		})

	socket.broadcast.emit('newMessage', {
			from: 'admin',
		    text: 'New user joined',
		    createdAt: new Date().getTime()
		})
		

	socket.on('createMessage', (message) => {
		console.log('createMsg', message);
		/*io.emit('newMessage', {
			from: message.from,
		    text: message.text,
		    createdAt: new Date().getTime()
		})*/

		socket.broadcast.emit('newMessage', {
			from: message.from,
		    text: message.text,
		    createdAt: new Date().getTime()
		})
	})

	socket.on('disconnect', () => {
    	console.log('disconnected from the server');
    })
})


server.listen(port, () => {
	console.log(`server is up on port ${port}`);
})