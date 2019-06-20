var socket = io();

function scrollToBottom() {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop +
       newMessageHeight + lastMessageHeight >= scrollHeight) {
           messages.scrollTop(scrollHeight);
    }
}

    socket.on('connect', function() {
    	console.log('connected to server');    	
    })

    socket.on('disconnect', function() {
    	console.log('disconnected from the server');
    })

    socket.on('newMessage', function(msg) {
        var formattedTime = moment(msg.createdAt).format('h:mm a');
        var template = $('#message-template').html();
        var html = Mustache.render(template, {
            from: msg.from,
            text: msg.text,
            createdAt: formattedTime
        });
        $('#messages').append(html);
        scrollToBottom();

    	/*var formattedTime = moment(msg.createdAt).format('h:mm a');
        var li = $('<li></li>');
            li.text(`${msg.from} ${formattedTime}: ${msg.text}`) ;

            $('#messages').append(li);*/
    })

    socket.on('newLocationMessage', function(msg) {
        var formattedTime = moment(msg.createdAt).format('h:mm a');
        var template = $('#location-message-template').html();
        var html = Mustache.render(template, {
            from: msg.from,
            url: msg.url,
            createdAt: formattedTime
        });
        $('#messages').append(html);
        scrollToBottom();

      /*  var li = $('<li></li>');
        var a = $('<a target="_blank">My current location</a>');
            li.text(`${msg.from} ${formattedTime}: `);
            a.attr('href', msg.url);
            li.append(a);
            $('#messages').append(li);*/
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
    }, function() {
        $('[name=message]').val('');
    })
})

var locationButton = $('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
       locationButton.removeAttr('disabled').text('Send location');

       socket.emit('createLocationMessage', {
          lat: position.coords.latitude,
          lon: position.coords.longitude
       })
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch position');
    });
})