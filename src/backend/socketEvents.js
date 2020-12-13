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
    this.players[socket.id] = {
      coords: { x: 10, y: 40 },
      color: getRandomColor(),
    };;

    socket.broadcast.emit('update-all-players', this.players);
    socket.emit('update-all-players', this.players);
  };

  move = (socket) => (direction) => {
    const player = this.players[socket.id]

    const speed = 10;

    if (direction.left) player.coords.x -= speed;
    if (direction.up) player.coords.y -= speed;
    if (direction.right) player.coords.x += speed;
    if (direction.down) player.coords.y += speed;

    socket.broadcast.emit('update-player', { socketId: socket.id, player });
    socket.emit('update-player', { socketId: socket.id, player });
  };

  disconnect = (socket) => () => {
    delete this.players[socket.id];
    socket.emit('delete-player', socket.id);
  };

  connection = (io) => (socket) => {
    socket.on('new-player', this.newPlayer(socket, io));
    socket.on('move', this.move(socket, io));
    socket.on('disconnect', this.disconnect(socket, io));
  };

  init = (io) => {
    io.on('connection', this.connection());
  };
}

module.exports = new SocketEvents().init;
