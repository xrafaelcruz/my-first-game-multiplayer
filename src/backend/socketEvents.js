function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
class SocketEvents {
  players = {};

  newPlayer = (socket) => () => {
    const player = {
      coords: { x: 10, y: 40 },
      color: getRandomColor(),
    };

    this.players[socket.id] = player;

    socket.emit('update-player', {
      socketId: socket.id,
      player,
    });
  };

  movement = (socket) => (direction) => {
    const player = this.players[socket.id] || {}; // ver isso

    console.log('movement player', player);

    if (direction.left) player.coords.x -= 15;
    if (direction.up) player.coords.y -= 15;
    if (direction.right) player.coords.x += 15;
    if (direction.down) player.coords.y += 15;

    socket.emit('update-player', {
      socketId: socket.id,
      player,
    });
  };

  disconnect = (socket) => () => {
    console.log('disconnect');
    delete this.players[socket.id];
    socket.emit('delete-player', socket.id);
  };

  connection = (io) => (socket) => {
    socket.on('new-player', this.newPlayer(socket, io));
    socket.on('movement', this.movement(socket, io));
    socket.on('disconnect', this.disconnect(socket, io));
  };

  init = (io) => {
    io.on('connection', this.connection());
  };
}

module.exports = new SocketEvents().init;
