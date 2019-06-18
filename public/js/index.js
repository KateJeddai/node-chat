var socket = io();

    socket.on('connect', function() {
    	console.log('connected to server');    	
    })

    socket.on('disconnect', function() {
    	console.log('disconnected from the server');
    })

    socket.on('newMessage', function(msg) {
    	console.log('new msg', msg);
        var li = $('<li></li>');
            li.text(`${msg.from}: ${msg.text}`) ;

            $('#messages').append(li);
    })

    socket.emit('createMessage', {
        from: 'andy',
        text: 'hello'
    }, function(data) {
        console.log('got it ', data);
    })

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function(data) {
        console.log('got it ', data);
    })
})