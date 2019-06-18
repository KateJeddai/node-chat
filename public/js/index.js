var socket = io();

    socket.on('connect', function() {
    	console.log('connected to server');

    	socket.emit('createEmail', {
    		to: "newtest@test.com",
    		text: "everything is good"
    	})

    	socket.emit('createMessage', {
    		to: "admin@test.com",
    		text: "Ok"
    	})
    })

    socket.on('disconnect', function() {
    	console.log('disconnected from the server');
    })

    socket.on('newEmail', function(email) {
    	console.log('new email', email);
    })

    socket.on('newMessage', function(msg) {
    	console.log('new msg', msg);
    })

