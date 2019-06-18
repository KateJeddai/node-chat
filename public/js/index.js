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

    socket.on('newLocationMessage', function(msg) {
        var li = $('<li></li>');
        var a = $('<a target="_blank">My current location</a>');
            li.text(`${msg.from}: `);
            a.attr('href', msg.url);
            li.append(a);
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

var locationButton = $('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
       socket.emit('createLocationMessage', {
          lat: position.coords.latitude,
          lon: position.coords.longitude
       })
    }, function() {
        alert('Unable to fetch position');
    });
})