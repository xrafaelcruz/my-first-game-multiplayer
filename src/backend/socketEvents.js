class SocketEvents {
  init(io) {
    setInterval(function() {
      io.sockets.emit('message', 'hi!');
    }, 1000);

    var players = {};
    io.on('connection', function(socket) {
      socket.on('new player', function() {
        players[socket.id] = {
          x: 300,
          y: 300,
        };
      });
      socket.on('movement', function(data) {
        var player = players[socket.id] || {};
        if (data.left) {
          player.x -= 5;
        }
        if (data.up) {
          player.y -= 5;
        }
        if (data.right) {
          player.x += 5;
        }
        if (data.down) {
          player.y += 5;
        }
      });
      socket.on('disconnect', function() {
        // remove disconnected player
        delete players[socket.id];
      });
    });

    setInterval(function() {
      io.sockets.emit('state', players);
    }, 1000 / 60);
  }
}

module.exports = new SocketEvents().init;
