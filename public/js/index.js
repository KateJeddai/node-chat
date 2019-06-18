var socket = io();

    socket.on('connect', function() {
    	console.log('connected to server');

    	
    })

    socket.on('disconnect', function() {
    	console.log('disconnected from the server');
    })

    
    socket.on('newMessage', function(msg) {
    	console.log('new msg', msg);
    })

