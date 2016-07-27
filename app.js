var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require('url');

var port = process.env.PORT || 3000;
http.listen(port, function() {
  console.log('listening on port: '+port);
});

app.get('/', function(req, res) {
  res.send('This server only does sockets.');
});

io.on('connection', function(socket) {
  socket.on('chat_msg_send', function(data) {
    socket.broadcast.emit('chat_msg_receive', data);
  });
});
